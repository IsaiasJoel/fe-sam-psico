import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { DTOPsicologoListar } from './psicologo.models';
import { PsicologoService } from './psicologo.service';
import { MatDialog } from '@angular/material/dialog';
import { SweetAlertService } from 'src/app/core/modals/sweet-alert.service';
import { Router } from '@angular/router';
import { ModalVerPsicologoComponent } from './modal-ver-psicologo/modal-ver-psicologo.component';
import { ModalPsicologoHorarioAtencionComponent } from './modal-psicologo-horario-atencion/modal-psicologo-horario-atencion.component';

@Component({
  selector: 'psicologo',
  templateUrl: './psicologo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PsicologoComponent {
  @ViewChild(MatPaginator) _paginator: MatPaginator;
  @ViewChild(MatSort) _sort: MatSort;

  columnas: string[] = ['nombresApellidos', /*'dni',*/ 'carrera', 'especialidad', 'casosAsignados', 'horario', /*'estado', 'editar', 'eliminar'*/];
  dataSource: MatTableDataSource<DTOPsicologoListar>;
  estaCargando: boolean = false;

  filtroDni: string;
  filtroNombres: string;
  filtroEstado: boolean | string; //es string en caso no se seleccione nada

  pagination = { numeroPagina: 0, tamanioPagina: 10, tamanioTotal: 0, index: 0 };
  pageableOptions = [10, 25, 100];

  //===================================================
  // Ciclo de vida
  //===================================================
  constructor(
    private _psicologoService: PsicologoService,
    private _matDialog: MatDialog,
    private _toastr: ToastrService,
    private _sweetAlertService: SweetAlertService,
    private _router: Router
  ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource([
      {
        id: 1, dni: '12345678', apPaterno: 'Dominguez', apMaterno: 'Montalbán', nombres: 'Isaías Joel', fechaNacimiento: '2 de agosto de 1999', carrera: 'Ing de sistemas',
        especialidad: 'Programación', casosAsignados: 0, habilitado: true
      },
      {
        id: 2, dni: '87654321', apPaterno: 'Nevado', apMaterno: 'Sánchez', nombres: 'Luis', fechaNacimiento: '3 de enero de 1995', carrera: 'Psicología',
        especialidad: 'Traumas', casosAsignados: 2, habilitado: true
      },
      {
        id: 3, dni: '272818299', apPaterno: 'Chanta', apMaterno: 'Melendez', nombres: 'Fiorella', fechaNacimiento: '8 de octubre de 1998', carrera: 'Psicología',
        especialidad: 'Organizacional', casosAsignados: 2, habilitado: true
      },
      {
        id: 4, dni: '62771829', apPaterno: 'Horna', apMaterno: 'Chiscul', nombres: 'Marjorie', fechaNacimiento: '18 de marzo de 1995', carrera: 'Psicología',
        especialidad: 'Clínica', casosAsignados: 2, habilitado: true
      },
      {
        id: 5, dni: '617728192', apPaterno: 'Cabrera', apMaterno: 'Alvear', nombres: 'Betsabeth', fechaNacimiento: '15 de septiembre de 1995', carrera: 'Ing de sistemas',
        especialidad: 'Programación', casosAsignados: 2, habilitado: true
      },
      {
        id: 6, dni: '152729381', apPaterno: 'Peña', apMaterno: 'Flores', nombres: 'Antony', fechaNacimiento: '9 de septiembre de 1996', carrera: 'Psicología',
        especialidad: 'Poblaciones vulnerables', casosAsignados: 1, habilitado: true
      }
    ]);
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
    // this.estaCargando = true;

    //TODO: 
    // try {
    //   const http$: Observable<ApiResponse> = this._usuarioService.listarPaginacion$(this._paginator?.pageIndex, this._paginator?.pageSize, this.filtroDni, this.filtroNombres, this.filtroEstado);
    //   const respServidor: ApiResponse = await lastValueFrom(http$);
    //   this._cargarDatosDelServidorAlDatasource(respServidor.data);
    //   this._toastr.success(TEXTO_CONSULTA_EXITOSA);
    // } catch (error) {
    //   this._toastr.error(TEXTO_CONSULTA_FALLO);
    // } finally {
    //   this.estaCargando = false;
    // }
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
    //TODO: descomentar cuando se complete
    // if (this._paginator != undefined && this._paginator != null) {
    //   // Obtener nuevamente los resultados si la paginación cambia de alguna manera
    //   this._paginator.page.pipe(
    //     switchMap((event) => {
    //       this.pagination.tamanioTotal = event.length;
    //       this.estaCargando = true;
    //       return this._usuarioService.listarPaginacion$(this._paginator?.pageIndex, this._paginator?.pageSize);
    //     }),
    //     map((respuestaServidor) => {
    //       this._cargarDatosDelServidorAlDatasource(respuestaServidor.data);
    //       this.estaCargando = false;
    //     })
    //   ).subscribe();
    // }
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

  async deshabilitar(idPsicologo: string) {
    const ref = await this._sweetAlertService.preguntarSiNo('¿Desea deshabilitar al psicologo?');
    if (!ref.isConfirmed) return;

    // try {
    //   const http$ = this._usuarioService.habilitar$(idPsicologo, 'deshabilitar');
    //   await lastValueFrom(http$);
    //   this._listar();
    //   this._toastr.success('El psicologo fue deshabilitado');
    // } catch (error) {
    //   const mensaje = (error as HttpErrorResponse).error.message.ERROR;
    //   this._sweetAlertService.mostrarMensaje('No se pudo deshabilitar al psicologo', mensaje, 'error');
    // }
  }

  async habilitar(idPsicologo: string) {
    const ref = await this._sweetAlertService.preguntarSiNo('¿Desea habilitar al psicologo?');
    if (!ref.isConfirmed) return;

    // try {
    //   const http$ = this._usuarioService.habilitar$(idPsicologo, 'habilitar');
    //   await lastValueFrom(http$);
    //   this._listar();
    //   this._toastr.success('El psicologo fue habilitado');
    // } catch (error) {
    //   const mensaje = (error as HttpErrorResponse).error.message.ERROR;
    //   this._sweetAlertService.mostrarMensaje('No se pudo habilitar al psicologo', mensaje, 'error');
    // }
  }

  irAPantallaCrear() {
    this._router.navigate(['/psicologos/crear']);
  }

  irAPantallaEditar(id: string) {
    this._router.navigate(['/psicologos/', id]);
  }

  irAPantallaVerCasosAsignados(id: number) {
    this._router.navigate(['/psicologos/', id, 'casos-asignados']);
  }

  //=====================================
  // Modales
  //=====================================
  abrirModalVerPsicologo(id: number) {
    this._matDialog.open(ModalVerPsicologoComponent, { data: { pId: id } });
  }

  abrirModalHorario(id: number) {
    this._matDialog.open(ModalPsicologoHorarioAtencionComponent, { data: { pId: id } });
  }
}
