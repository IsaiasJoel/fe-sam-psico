import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ServiciosService } from './servicios.service';
import { Observable, lastValueFrom } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response.interface';
import { ToastrService } from 'ngx-toastr';
import { SweetAlertService } from 'src/app/core/modals/sweet-alert.service';
import { TEXTO_CONSULTA_EXITOSA, TEXTO_CONSULTA_FALLO } from 'src/app/core/utils/constants.utils';
import { MatDialog } from '@angular/material/dialog';
import { ModalCrearServicioComponent } from './modal-crear-servicio/modal-crear-servicio.component';
import { CONSULTA_CORRECTA } from 'src/app/shared/data/shared.data';
import { ModalEditarServicioComponent } from './modal-editar-servicio/modal-editar-servicio.component';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html'
})
export class ServicioComponent implements OnInit {
  columnas: string[] = ['descripcion', 'costo', 'estado', 'editar', 'eliminar'];
  dataSource: MatTableDataSource<any>;
  estaCargando: boolean = true;


  //===================================================
  // Ciclo de vida
  //===================================================
  constructor(
    private _serviciosService: ServiciosService,
    private _toastr: ToastrService,
    private _sweetAlertService: SweetAlertService,
    private _matDialog: MatDialog
  ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit(): void {
    this._listar();
  }

  //===================================================
  // Métodos privados
  //===================================================
  private async _listar() {
    this.estaCargando = true;

    try {
      const http$: Observable<ApiResponse> = this._serviciosService.listar$();
      const respServidor: ApiResponse = await lastValueFrom(http$);
      this.dataSource = new MatTableDataSource(respServidor.data)
      this._toastr.success(TEXTO_CONSULTA_EXITOSA);
    } catch (error) {
      this._toastr.error(TEXTO_CONSULTA_FALLO);
    } finally {
      this.estaCargando = false;
    }
  }

  //===================================================
  // Métodos públicos
  //===================================================
  abrirModalCrear() {
    const ref = this._matDialog.open(ModalCrearServicioComponent);
    ref.afterClosed().subscribe(respuestaModal => {
      if (respuestaModal == 'OK') {
        this._listar();
        this._toastr.success(CONSULTA_CORRECTA);
      }
    });
  }

  abrirModalEditar(id: number) {
    const ref = this._matDialog.open(ModalEditarServicioComponent, { data: { pId: id } });
    ref.afterClosed().subscribe(respuestaModal => {
      if (respuestaModal == 'OK') {
        this._listar();
      }
    });
  }

  async deshabilitar(idServicio: string) {
    const ref = await this._sweetAlertService.preguntarSiNo('¿Desea deshabilitar el servicio?');
    if (!ref.isConfirmed) return;

    const http$ = this._serviciosService.habilitar$(idServicio, 'deshabilitar');
    await lastValueFrom(http$);
    this._listar();
  }

  async habilitar(idServicio: string) {
    const ref = await this._sweetAlertService.preguntarSiNo('¿Desea habilitar el servicio?');
    if (!ref.isConfirmed) return;

    const http$ = this._serviciosService.habilitar$(idServicio, 'habilitar');
    await lastValueFrom(http$);
    this._listar();
  }
}
