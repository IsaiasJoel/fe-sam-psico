import { Component } from '@angular/core';
import { FormBuilder, UntypedFormGroup } from '@angular/forms';
import { NACIONALIDADES, OPCIONES_SEXO } from 'src/app/shared/data/shared.data';
import { OpcionesComboSexo } from 'src/app/shared/models/shared.models';
import { UsuarioService } from '../usuario.service';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { TEXTO_CONSULTA_EXITOSA } from 'src/app/core/utils/constants.utils';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-crear-usuario',
  templateUrl: './modal-crear-usuario.component.html'
})
export class ModalCrearUsuarioComponent {
  comboSexo: OpcionesComboSexo[] = OPCIONES_SEXO;
  comboNacionalidad: string[] = NACIONALIDADES;

  form: UntypedFormGroup;
  estaCargando: boolean = false;

  constructor(
    public matRef: MatDialogRef<ModalCrearUsuarioComponent>,
    private _formBuilder: FormBuilder,
    private _usuarioService: UsuarioService,
    private _toastrService: ToastrService
    // private _route: Router,
  ) { }

  ngOnInit(): void {
    this._crearFormulario();
    // this._suscribirseAlEventoActualizarPestaña();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Métodos privados
  // -----------------------------------------------------------------------------------------------------
  private _crearFormulario() {
    this.form = this._formBuilder.group({
      correo: [, []],
      apPaterno: [, []],
      apMaterno: [, []],
      nombres: [, []],
      dni: [, []],
      fechaNacimiento: [, []],
      sexo: [OPCIONES_SEXO[1], []],
      celular: [, []],
      nacionalidad: ['PERU', []],
      carrera: [, []],
      especialidad: [, []],
      universidad: [, []],
      colegiado: ['N', []],
      anioEgreso: [, []],
      numeroColegiatura: [, []],
      resumenProfesional: [, []],
      habilitado: [true, []]
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Métodos públicos
  // -----------------------------------------------------------------------------------------------------
  public async procesarSolicitud() {
    if (this.form.invalid) {
      // this._fuseConfirmationService.mensajeErrorValidacionFormulario();
      return;
    }

    this.form.disable();
    // this.capturarDatos();

    try {
      const http$ = this._usuarioService.crear$(this.form.value);
      await lastValueFrom(http$);
      this._toastrService.success(TEXTO_CONSULTA_EXITOSA);
    } catch (error) {
      this._toastrService.error(error.message.ERROR);
    } finally {
      this.estaCargando = false;
    }
  }

  cambioSelectColegiado() {
    this.form.get('numeroColegiatura').setValue('');
  }

  get esColegiado(): boolean {
    return this.form.get('colegiado').value == 'SI';
  }
}
