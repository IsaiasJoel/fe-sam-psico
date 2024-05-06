import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ServiciosService } from './servicios.service';
import { Observable, lastValueFrom } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response.interface';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ModalCrearServicioComponent } from './modal-crear-servicio/modal-crear-servicio.component';
import { CONSULTA_CORRECTA } from 'src/app/shared/data/shared.data';
import { ModalEditarServicioComponent } from './modal-editar-servicio/modal-editar-servicio.component';
import { DTOServicioListar } from './servicio.model';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicioComponent implements OnInit {
  servicios: DTOServicioListar[] = [];

  //===================================================
  // Ciclo de vida
  //===================================================
  constructor(
    private _serviciosService: ServiciosService,
    private _toastr: ToastrService,
    private _matDialog: MatDialog,
    private _changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this._listar();
  }

  //===================================================
  // Métodos privados
  //===================================================
  private async _listar() {
    const http$: Observable<ApiResponse> = this._serviciosService.listarTodos$();
    const respServidor: ApiResponse = await lastValueFrom(http$);
    this.servicios = respServidor.data;
    this._changeDetectorRef.markForCheck();
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
}
