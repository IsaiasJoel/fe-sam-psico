import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ServiciosService } from '../servicios.service';
import { lastValueFrom } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response.interface';

@Component({
  selector: 'app-modal-crear-servicio',
  templateUrl: './modal-crear-servicio.component.html'
})
export class ModalCrearServicioComponent implements OnInit {
  estaCargando: boolean;
  form: FormGroup

  //===============================================================
  // Ciclo de vida
  //===============================================================
  constructor(
    public matRef: MatDialogRef<ModalCrearServicioComponent>,
    private _servicioService: ServiciosService,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this._iniciarFormulario();
  }

  //===============================================================
  // Métodos privados
  //===============================================================
  private _iniciarFormulario() {
    this.form = this._formBuilder.group({
      descripcion: [null, Validators.required],
      costo: [null, [Validators.required]],
      habilitado: [true]
    });
  }

  //===============================================================
  // Métodos públicos
  //===============================================================
  async procesarSolicitud() {
    this.estaCargando = true;
    if (this.form.invalid) {
      //TODO: do anything
      this.estaCargando = false;
      return;
    }

    const http$ = this._servicioService.crear$(this.form.value);
    const respuestaServidor: ApiResponse = await lastValueFrom(http$);
    this.estaCargando = false;
    this.matRef.close('OK');
  }
}