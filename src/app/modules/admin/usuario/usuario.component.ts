import { Component, ViewChild } from '@angular/core';
import { CriterioBusqueda } from 'src/app/shared/models/shared.models';
import { CRITERIOS_BUSQUEDA } from './usuario.data';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiResponse } from 'src/app/core/models/api-response.interface';
import { Observable, lastValueFrom, map, switchMap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DTOUsuarioListar } from './usuario.models';
import { UsuarioService } from './usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalCrearUsuarioComponent } from './modal-crear-usuario/modal-crear-usuario.component';
import { TEXTO_CONSULTA_EXITOSA, TEXTO_CONSULTA_FALLO } from 'src/app/core/utils/constants.utils';

@Component({
  selector: 'usuario',
  templateUrl: './usuario.component.html'
})
export class VoluntarioComponent {
  @ViewChild(MatPaginator) _paginator: MatPaginator;
  @ViewChild(MatSort) _sort: MatSort;

  criterioBusquedaSeleccionado: CriterioBusqueda = CRITERIOS_BUSQUEDA[0];
  criterios: CriterioBusqueda[] = CRITERIOS_BUSQUEDA;

  columnas: string[] = ['nombresApellidos', 'edad', 'carrera', 'especialidad', 'casosAsignados', 'editar', 'eliminar'];
  dataSource: MatTableDataSource<DTOUsuarioListar>;
  estaCargando: boolean = true;
  filtro: string;

  pagination = { numeroPagina: 0, tamanioPagina: 10, tamanioTotal: 0, index: 0 };
  pageableOptions = [10, 25, 100];

  //===================================================
  // Ciclo de vida
  //===================================================
  constructor(
    private _usuarioService: UsuarioService,
    private _matDialog: MatDialog,
    private _toastr: ToastrService,
    // private _sweetAlertService: SweetAlertService
  ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit(): void {
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
      const http$: Observable<ApiResponse> = this._usuarioService.listarPaginacion$(this._paginator?.pageIndex, this._paginator?.pageSize, this.filtro);
      const respServidor: ApiResponse = await lastValueFrom(http$);
      this._cargarDatosDelServidorAlDatasource(respServidor.data);
      this._toastr.success(TEXTO_CONSULTA_EXITOSA);
    } catch (error) {
      this._toastr.error(TEXTO_CONSULTA_FALLO);
    } finally {
      this.estaCargando = false;
    }
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

  abrirModalCrear() {
    const ref = this._matDialog.open(ModalCrearUsuarioComponent);
    ref.afterClosed().subscribe(respuestaModal => {
      if (respuestaModal == 'OK') {
        this._toastr.success('Se agregó correctamente');
      }
    });
  }

}
