import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
import { DTOServicioListar } from './servicio.model';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ServicioComponent implements OnInit {
  servicios: DTOServicioListar[] = [
    {
      id: 1,
      nombre: 'Atención con costo social',
      costo: 50,
      habilitado: true,
      imagen: 'https://img.freepik.com/vector-premium/terapia-atencion-psicologica-paciente-deprimida-hablando-consultando-psicologo_547662-1131.jpg'
    },
    {
      id: 2,
      nombre: 'Terapia fisica',
      costo: 100,
      habilitado: true,
      imagen: 'https://elblogdelbienestar.com/wp-content/uploads/2022/12/2022-12_-En-Clave-de-PAE-Asistencia-24-7-Imagen-1280x720.jpg'
    },
    {
      id: 3,
      nombre: 'Atención médica general',
      costo: 80,
      habilitado: true,
      imagen: 'https://usmp.edu.pe/wp-content/uploads/2022/05/ser_psi.jpg'
    }
  ];

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
    // this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit(): void {
    this._listar();
  }

  //===================================================
  // Métodos privados
  //===================================================
  private async _listar() {
    // this.estaCargando = true;

    // try {
    //   const http$: Observable<ApiResponse> = this._serviciosService.listar$();
    //   const respServidor: ApiResponse = await lastValueFrom(http$);
    //   this.dataSource = new MatTableDataSource(respServidor.data)
    //   this._toastr.success(TEXTO_CONSULTA_EXITOSA);
    // } catch (error) {
    //   this._toastr.error(TEXTO_CONSULTA_FALLO);
    // } finally {
    //   this.estaCargando = false;
    // }
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

  // async deshabilitar(idServicio: string) {
  //   const ref = await this._sweetAlertService.preguntarSiNo('¿Desea deshabilitar el servicio?');
  //   if (!ref.isConfirmed) return;

  //   const http$ = this._serviciosService.habilitar$(idServicio, 'deshabilitar');
  //   await lastValueFrom(http$);
  //   this._listar();
  // }

  // async habilitar(idServicio: string) {
  //   const ref = await this._sweetAlertService.preguntarSiNo('¿Desea habilitar el servicio?');
  //   if (!ref.isConfirmed) return;

  //   const http$ = this._serviciosService.habilitar$(idServicio, 'habilitar');
  //   await lastValueFrom(http$);
  //   this._listar();
  // }
}
