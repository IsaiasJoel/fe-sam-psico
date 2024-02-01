import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ServiciosService } from './servicios.service';
import { Observable, lastValueFrom } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response.interface';
import { ToastrService } from 'ngx-toastr';
import { SweetAlertService } from 'src/app/core/modals/sweet-alert.service';
import { TEXTO_CONSULTA_EXITOSA, TEXTO_CONSULTA_FALLO } from 'src/app/core/utils/constants.utils';

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
    private _sweetAlertService: SweetAlertService
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
  abrirModalEditar(id: number) {

  }

  habilitar(id: number) {

  }

  deshabilitar(id: number) {

  }
}
