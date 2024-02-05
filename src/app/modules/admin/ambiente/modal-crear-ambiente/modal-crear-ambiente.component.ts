import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AmbienteService } from '../ambiente.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-modal-crear-ambiente',
  templateUrl: './modal-crear-ambiente.component.html'
})
export class ModalCrearAmbienteComponent {
  estaCargando: boolean;
  form: FormGroup

  //===============================================================
  // Ciclo de vida
  //===============================================================
  constructor(
    public matRef: MatDialogRef<ModalCrearAmbienteComponent>,
    private _ambienteService: AmbienteService,
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
      nombre: [null, Validators.required],
      ubicacion: [null, [Validators.required]],
      aforo: [null, [Validators.required]],
      disponible: [true, [Validators.required]],
      descripcion: [null, [Validators.required]],
      habilitado: [true, [Validators.required]]
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

    const http$ = this._ambienteService.crear$(this.form.value);
    await lastValueFrom(http$);
    this.estaCargando = false;
    this.matRef.close('OK');
  }
}
