import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { lastValueFrom, map, switchMap } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response.interface';
import { UsuarioService } from './usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { SweetAlertService } from 'src/app/core/modals/sweet-alert.service';
import { DTOUsuarioListar } from './usuario.models';

@Component({
  selector: 'usuario',
  templateUrl: './usuario.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsuarioComponent {
  displayedColumns: string[] = ['apellidosNombres', 'estado', 'roles', 'resetContrasenia', 'editar'];
  dataSource: MatTableDataSource<DTOUsuarioListar>;

  // FILTROS
  filtroEstado: string = 'X';
  filtroApellidosNombres: string = '';
  // FIN FILTROS

  // Pagination
  pagination = { numeroPagina: 0, tamanioPagina: 10, tamanioTotal: 0, index: 0 };
  pageableOptions = [10, 25, 100];
  //

  @ViewChild(MatPaginator) _paginator: MatPaginator;
  @ViewChild(MatSort) _sort: MatSort;

  constructor(
    private _usuarioService: UsuarioService,
    private _matDialog: MatDialog,
    // private _toastr: ToastrService,
    private _sweetAlertService: SweetAlertService,
    private _changeDetectionRef: ChangeDetectorRef
  ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource([
      { id: 1, activo: true, nombresCompletos: 'Isaías Joel Domínguez Montalbán' }
    ]);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    //debe estar aquí porque en este punto ya cargó el MatPaginator, de lo contrario es undefined
    this._suscribirseAlPaginator();
    this._listarUsuarios();
  }

  //=====================================
  // Métodos privados
  //=====================================
  private async _listarUsuarios() {
    const http$ = this._usuarioService.listarUsuariosPaginacion$(this._paginator?.pageIndex, this._paginator?.pageSize, this.filtroApellidosNombres, this.filtroEstado);
    const respuestaServidor: ApiResponse = await lastValueFrom(http$);
    this._cargarDatosDelServidorAlDatasource(respuestaServidor.data);
    this._changeDetectionRef.markForCheck();
  }

  /**almacenar la respuesta del servidor en variables locales*/
  private _cargarDatosDelServidorAlDatasource(data: any): void {
    //setear data source
    this.dataSource = null;
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
          return this._usuarioService.listarUsuariosPaginacion$(this._paginator?.pageIndex, this._paginator?.pageSize);
        }),
        map((respuestaServidor) => {
          this._cargarDatosDelServidorAlDatasource(respuestaServidor.data);
        })
      ).subscribe();
    }
  }

  // private _abrirSnackBar(mensaje: string): void {
  //   this._toastr.success('', mensaje);
  // }

  // private _procesarRespuestaServidor(respuesta: ApiResponse | HttpErrorResponse): void {
  //   if (respuesta instanceof HttpErrorResponse) {
  //     const mensaje: string = respuesta.error.message.ERROR;
  //     this._sweetAlertService.mostrarMensaje('La autorización falló', mensaje, 'error');
  //     return;
  //   }

  //   if (respuesta.successful) {
  //     this._listarUsuarios();
  //     this._abrirSnackBar('Autorización exitosa');
  //     return;
  //   }
  // }

  //=====================================
  // Métodos públicos
  //=====================================
  filtrar(event: KeyboardEvent) {
    if (event.key != 'Enter') return;
    this._listarUsuarios();
    if (!this.dataSource.paginator) return;
    this.dataSource.paginator.firstPage();
  }

  clickFiltrar() {
    this._listarUsuarios();
  }

  limpiarCampos() {
    this.filtroEstado = 'X';
    // this.filtroSuperusuario = 'X';
    this.filtroApellidosNombres = '';
    // this.filtroDni = '';
    this.clickFiltrar();
  }

  async resetearContrasenia(codigoUsuario: string) {
    // this.estaCargandoBotonResetContrasenia = true;
    const ref = await this._sweetAlertService.preguntarSiNo('Esta accion reestablecerá la contraseña por defecto');
    if (!ref.isConfirmed) return;
    // try {
    const respuestaServidor: ApiResponse = await lastValueFrom(this._usuarioService.resetContrasenia$(codigoUsuario));
    if (!respuestaServidor.successful) return;
    // this._abrirSnackBar('Se reestableció la contrasenia');
    // this.estaCargandoBotonResetContrasenia = false;
    // } catch (error) {
    //   // this.estaCargandoBotonResetContrasenia = false;
    //   const mensaje = (error as HttpErrorResponse).error.message.ERROR;
    //   this._sweetAlertService.mostrarMensaje('No se pudo reestablecer la contraseña', mensaje, 'error');
    // }
  }

  abrirModalVerMenuesPorUsuario(pidUsuario: number, pNombresCompletos: string) {
    const ref = this._matDialog.open(null,
      {
        // width: '40%',
        // height: '100%',
        data: {
          codigoUsuario: pidUsuario,
          nombresUsuario: pNombresCompletos
        }
      });

    ref.afterClosed().subscribe(respuestaModal => {
      if (respuestaModal == 'OK') {
        // this._abrirSnackBar('Los roles fueron actualizados');
      }
    })
  }

  abrirModalEditarUsuario(pCodigoTrabajador: string) {
    const ref = this._matDialog.open(null,
      {
        data: {
          codigoTrabajador: pCodigoTrabajador
        }
      });

    ref.afterClosed().subscribe(respuestaModal => {
      if (respuestaModal == 'OK') {
        // this._abrirSnackBar('El usuario fue editado correctamente');
        this._listarUsuarios();
      }
    });
  }

  abrirModalCrearUsuario() {
    const ref = this._matDialog.open(null);

    ref.afterClosed().subscribe(respuestaModal => {
      if (respuestaModal == 'OK') {
        // this._abrirSnackBar('El usuario fue creado correctamente');
        this._listarUsuarios();
      }
    });
  }

  // async preguntarAutorizarReniec(dni: string, codigoUsuario: string): Promise<void> {
  //   const ref = await this._sweetAlertService.preguntarSiNo('Dar acceso a RENIEC');
  //   if (!ref.isConfirmed) return;
  //   try {
  //     const respuestaServidor: ApiResponse = await lastValueFrom(this._usuarioService.darAccesoAReniec$(dni, codigoUsuario));
  //     this._procesarRespuestaServidor(respuestaServidor);
  //   } catch (error) {
  //     this._procesarRespuestaServidor(error);
  //   }
  // }

}
