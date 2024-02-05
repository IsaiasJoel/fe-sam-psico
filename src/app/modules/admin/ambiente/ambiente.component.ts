import { Component } from '@angular/core';
import { AmbienteService } from './ambiente.service';
import { ToastrService } from 'ngx-toastr';
import { SweetAlertService } from 'src/app/core/modals/sweet-alert.service';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DTOAmbienteListar } from './ambiente.model';
import { Observable, lastValueFrom } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response.interface';
import { TEXTO_CONSULTA_EXITOSA, TEXTO_CONSULTA_FALLO } from 'src/app/core/utils/constants.utils';
import { ModalCrearAmbienteComponent } from './modal-crear-ambiente/modal-crear-ambiente.component';
import { CONSULTA_CORRECTA } from 'src/app/shared/data/shared.data';
import { ModalEditarAmbienteComponent } from './modal-editar-ambiente/modal-editar-ambiente.component';

@Component({
  selector: 'app-ambiente',
  templateUrl: './ambiente.component.html'
})
export class AmbienteComponent {
  columnas: string[] = ['nombre', 'ubicacion', 'aforo', 'disponible', 'descripcion', 'habilitado', 'editar', 'eliminar'];
  dataSource: MatTableDataSource<DTOAmbienteListar>;
  estaCargando: boolean = true;


  //===================================================
  // Ciclo de vida
  //===================================================
  constructor(
    private _ambienteService: AmbienteService,
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
      const http$: Observable<ApiResponse> = this._ambienteService.listar$();
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
    const ref = this._matDialog.open(ModalCrearAmbienteComponent);
    ref.afterClosed().subscribe(respuestaModal => {
      if (respuestaModal == 'OK') {
        this._listar();
        this._toastr.success(CONSULTA_CORRECTA);
      }
    });
  }

  abrirModalEditar(id: number) {
    const ref = this._matDialog.open(ModalEditarAmbienteComponent, { data: { pId: id } });
    ref.afterClosed().subscribe(respuestaModal => {
      if (respuestaModal == 'OK') {
        this._listar();
      }
    });
  }

  async deshabilitar(idServicio: string) {
    const ref = await this._sweetAlertService.preguntarSiNo('¿Desea deshabilitar el servicio?');
    if (!ref.isConfirmed) return;

    const http$ = this._ambienteService.habilitar$(idServicio, 'deshabilitar');
    await lastValueFrom(http$);
    this._listar();
  }

  async habilitar(idServicio: string) {
    const ref = await this._sweetAlertService.preguntarSiNo('¿Desea habilitar el servicio?');
    if (!ref.isConfirmed) return;

    const http$ = this._ambienteService.habilitar$(idServicio, 'habilitar');
    await lastValueFrom(http$);
    this._listar();
  }
}
