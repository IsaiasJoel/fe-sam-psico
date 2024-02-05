import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { lastValueFrom } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response.interface';
import { AmbienteService } from '../ambiente.service';

@Component({
  selector: 'app-modal-editar-ambiente',
  templateUrl: './modal-editar-ambiente.component.html'
})
export class ModalEditarAmbienteComponent {
  estaCargando: boolean;
  form: FormGroup

  //===============================================================
  // Ciclo de vida
  //===============================================================
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { pId: number },
    public matRef: MatDialogRef<ModalEditarAmbienteComponent>,
    private _ambienteService: AmbienteService,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this._inicializarDatos();
  }

  //===============================================================
  // Métodos privados
  //===============================================================
  private async _inicializarDatos() {
    this._iniciarFormulario();

    const http$ = this._ambienteService.buscarPorId$(this.data.pId);
    const respuestaServidor: ApiResponse = await lastValueFrom(http$);
    this.form.patchValue(respuestaServidor.data);
  }

  private _iniciarFormulario() {
    this.form = this._formBuilder.group({
      id: [null, Validators.required],
      nombre: [null, Validators.required],
      ubicacion: [null, [Validators.required]],
      aforo: [null, [Validators.required]],
      disponible: [null, [Validators.required]],
      descripcion: [null, [Validators.required]],
      habilitado: [null, [Validators.required]]
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

    const http$ = this._ambienteService.editar$(this.form.value);
    await lastValueFrom(http$);
    this.estaCargando = false;
    this.matRef.close('OK');
  }
}
