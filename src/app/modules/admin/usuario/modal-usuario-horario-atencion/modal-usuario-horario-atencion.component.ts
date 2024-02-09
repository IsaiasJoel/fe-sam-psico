import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-usuario-horario-atencion',
  templateUrl: './modal-usuario-horario-atencion.component.html'
})
export class ModalUsuarioHorarioAtencionComponent {
  usuario: any;
  form: FormGroup;

  //===========================================================
  // Ciclo de vida
  //===========================================================
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { pId: number },
    public matRef: MatDialogRef<ModalUsuarioHorarioAtencionComponent>,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this._obtenerDatos();
    this._crearFormulario();    
  }

  //===========================================================
  // Métodos privados
  //===========================================================
  private async _obtenerDatos() {
    // const http$ = this._usuarioService.buscarUsuarioPorId$(this.data.pId);
    // const respuestaServidor: ApiResponse = await lastValueFrom(http$);
    // this.usuario = respuestaServidor.data;
  }

  //===========================================================
  // Métodos públicos
  //===========================================================
  private _crearFormulario() {
    this.form = this._formBuilder.group({
      lunes: this._formBuilder.group({
        activo: [false, [Validators.required]],
        horaInicio: [null, [Validators.required]],
        horaFin: [null, [Validators.required]]
      }),
      martes: this._formBuilder.group({
        activo: [false, [Validators.required]],
        horaInicio: [null, [Validators.required]],
        horaFin: [null, [Validators.required]]
      }),
      miercoles: this._formBuilder.group({
        activo: [false, [Validators.required]],
        horaInicio: [null, [Validators.required]],
        horaFin: [null, [Validators.required]]
      }),
      jueves: this._formBuilder.group({
        activo: [false, [Validators.required]],
        horaInicio: [null, [Validators.required]],
        horaFin: [null, [Validators.required]]
      }),
      viernes: this._formBuilder.group({
        activo: [false, [Validators.required]],
        horaInicio: [null, [Validators.required]],
        horaFin: [null, [Validators.required]]
      }),
      sabado: this._formBuilder.group({
        activo: [false, [Validators.required]],
        horaInicio: [null, [Validators.required]],
        horaFin: [null, [Validators.required]]
      }),
      domingo: this._formBuilder.group({
        activo: [false, [Validators.required]],
        horaInicio: [null, [Validators.required]],
        horaFin: [null, [Validators.required]]
      })
    });
  }
}
