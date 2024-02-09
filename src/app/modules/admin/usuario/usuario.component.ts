import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiResponse } from 'src/app/core/models/api-response.interface';
import { Observable, lastValueFrom, map, switchMap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DTOUsuarioListar } from './usuario.models';
import { UsuarioService } from './usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { TEXTO_CONSULTA_EXITOSA, TEXTO_CONSULTA_FALLO } from 'src/app/core/utils/constants.utils';
import { SweetAlertService } from 'src/app/core/modals/sweet-alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ModalVerUsuarioComponent } from './modal-ver-usuario/modal-ver-usuario.component';
import { ModalUsuarioHorarioAtencionComponent } from './modal-usuario-horario-atencion/modal-usuario-horario-atencion.component';

@Component({
  selector: 'usuario',
  templateUrl: './usuario.component.html'
})
export class UsuarioComponent {
  @ViewChild(MatPaginator) _paginator: MatPaginator;
  @ViewChild(MatSort) _sort: MatSort;

  columnas: string[] = ['nombresApellidos', 'dni', 'carrera', 'especialidad', 'casosAsignados', 'horario', 'estado', 'editar', 'eliminar'];
  dataSource: MatTableDataSource<DTOUsuarioListar>;
  estaCargando: boolean = true;

  filtroDni: string;
  filtroNombres: string;
  filtroEstado: boolean | string; //es string en caso no se seleccione nada

  pagination = { numeroPagina: 0, tamanioPagina: 10, tamanioTotal: 0, index: 0 };
  pageableOptions = [10, 25, 100];

  //===================================================
  // Ciclo de vida
  //===================================================
  constructor(
    private _usuarioService: UsuarioService,
    private _matDialog: MatDialog,
    private _toastr: ToastrService,
    private _sweetAlertService: SweetAlertService,
    private _router: Router
  ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit(): void {
    this._iniciarFiltros();
  }

  ngAfterViewInit() {
    //debe estar aquí porque en este punto ya cargó el MatPaginator, de lo contrario es undefined
    this._suscribirseAlPaginator();
    this._listar();
  }

  //=====================================
  // Métodos privados
  //=====================================
  private async _listar() {
    this.estaCargando = true;

    try {
      const http$: Observable<ApiResponse> = this._usuarioService.listarPaginacion$(this._paginator?.pageIndex, this._paginator?.pageSize, this.filtroDni, this.filtroNombres, this.filtroEstado);
      const respServidor: ApiResponse = await lastValueFrom(http$);
      this._cargarDatosDelServidorAlDatasource(respServidor.data);
      this._toastr.success(TEXTO_CONSULTA_EXITOSA);
    } catch (error) {
      this._toastr.error(TEXTO_CONSULTA_FALLO);
    } finally {
      this.estaCargando = false;
    }
  }

  private _iniciarFiltros() {
    this.filtroEstado = 'Todos';
  }

  /**almacenar la respuesta del servidor en variables locales*/
  private _cargarDatosDelServidorAlDatasource(data: any): void {
    //setear data source
    this.dataSource = null;
    // this.tieneContenido = (data.content as [])?.length != 0;
    this.dataSource = new MatTableDataSource(data.content)
    this.dataSource.sort = this._sort;

    //actualizar paginación
    this.pagination.tamanioTotal = data.totalElements;
    this.pagination.tamanioPagina = data.size;
    this.pagination.index = data.number;
  }

  private _suscribirseAlPaginator() {
    if (this._paginator != undefined && this._paginator != null) {
      // Obtener nuevamente los resultados si la paginación cambia de alguna manera
      this._paginator.page.pipe(
        switchMap((event) => {
          this.pagination.tamanioTotal = event.length;
          this.estaCargando = true;
          return this._usuarioService.listarPaginacion$(this._paginator?.pageIndex, this._paginator?.pageSize);
        }),
        map((respuestaServidor) => {
          this._cargarDatosDelServidorAlDatasource(respuestaServidor.data);
          this.estaCargando = false;
        })
      ).subscribe();
    }
  }

  //=====================================
  // Métodos públicos
  //=====================================
  filtrar(event: KeyboardEvent) {
    if (event.key != 'Enter') return;
    this._listar();
    if (!this.dataSource.paginator) return;
    this.dataSource.paginator.firstPage();
  }

  clickFiltrar() {
    this._listar();
  }

  teclaEnterFiltrar(e: KeyboardEvent) {
    if (e.key != 'Enter') return;
    this._listar();
  }

  cambiarFiltroEstado(item) {
    this.filtroEstado = item;
    this._listar();
  }

  async deshabilitar(idUsuario: string) {
    const ref = await this._sweetAlertService.preguntarSiNo('¿Desea deshabilitar al usuario?');
    if (!ref.isConfirmed) return;

    try {
      const http$ = this._usuarioService.habilitar$(idUsuario, 'deshabilitar');
      await lastValueFrom(http$);
      this._listar();
      this._toastr.success('El usuario fue deshabilitado');
    } catch (error) {
      const mensaje = (error as HttpErrorResponse).error.message.ERROR;
      this._sweetAlertService.mostrarMensaje('No se pudo deshabilitar al usuario', mensaje, 'error');
    }
  }

  async habilitar(idUsuario: string) {
    const ref = await this._sweetAlertService.preguntarSiNo('¿Desea habilitar al usuario?');
    if (!ref.isConfirmed) return;

    try {
      const http$ = this._usuarioService.habilitar$(idUsuario, 'habilitar');
      await lastValueFrom(http$);
      this._listar();
      this._toastr.success('El usuario fue habilitado');
    } catch (error) {
      const mensaje = (error as HttpErrorResponse).error.message.ERROR;
      this._sweetAlertService.mostrarMensaje('No se pudo habilitar al usuario', mensaje, 'error');
    }
  }

  irAPantallaCrear() {
    this._router.navigate(['/usuarios/crear']);
  }

  irAPantallaEditar(id: string) {
    this._router.navigate(['/usuarios/', id]);
  }

  //=====================================
  // Modales
  //=====================================
  abrirModalVerUsuario(id: number) {
    this._matDialog.open(ModalVerUsuarioComponent, { data: { pId: id } });
  }

  abrirModalHorario(id: number) {
    this._matDialog.open(ModalUsuarioHorarioAtencionComponent, { data: { pId: id } });
  }
}
