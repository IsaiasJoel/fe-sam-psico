import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  form: FormGroup;
  estaCargando: boolean = false;

  constructor(
    public matRef: MatDialogRef<ModalCrearUsuarioComponent>,
    private _formBuilder: FormBuilder,
    private _usuarioService: UsuarioService,
    private _toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this._crearFormulario();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Métodos privados
  // -----------------------------------------------------------------------------------------------------
  private _crearFormulario() {
    this.form = this._formBuilder.group({
      correo: [null, [Validators.required, Validators.email]],
      apPaterno: [null, [Validators.required]],
      apMaterno: [null, [Validators.required]],
      nombres: [null, [Validators.required]],
      dni: [null, [Validators.required]],
      fechaNacimiento: [null, [Validators.required]],
      sexo: [OPCIONES_SEXO[1].nombre, [Validators.required]],
      celular: [null, []],
      nacionalidad: ['PERU', []],
      carrera: [null, []],
      especialidad: [null, []],
      universidad: [null, []],
      colegiado: [false, []],
      anioEgreso: [null, []],
      numeroColegiatura: [null, []],
      resumenProfesional: [null, []],
      habilitado: [true, [Validators.required]]
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Métodos públicos
  // -----------------------------------------------------------------------------------------------------
  public async procesarSolicitud() {
    this.estaCargando = true;

    if (this.form.invalid) {
      this.estaCargando = false;
      return;
    }

    try {
      const http$ = this._usuarioService.crear$(this.form.value);
      await lastValueFrom(http$);
      this._toastrService.success(TEXTO_CONSULTA_EXITOSA);
      this.matRef.close('OK');
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
    return this.form.get('colegiado').value;
  }


  // -----------------------------------------------------------------------------------------------------
  // @ Variables de control de errores en campos obligatorios
  // -----------------------------------------------------------------------------------------------------
  get correoEsRequerido(): boolean {
    const control: AbstractControl = this.form.get('correo');
    return control.hasError('required') && control.touched;
  }

  get apPaternoEsRequerido(): boolean {
    const control: AbstractControl = this.form.get('apPaterno');
    return control.hasError('required') && control.touched;
  }

  get apMaternoEsRequerido(): boolean {
    const control: AbstractControl = this.form.get('apMaterno');
    return control.hasError('required') && control.touched;
  }

  get nombresEsRequerido(): boolean {
    const control: AbstractControl = this.form.get('nombres');
    return control.hasError('required') && control.touched;
  }

  get dniEsRequerido(): boolean {
    const control: AbstractControl = this.form.get('dni');
    return control.hasError('required') && control.touched;
  }

  get fechaNacimientoEsRequerido(): boolean {
    const control: AbstractControl = this.form.get('fechaNacimiento');
    return control.hasError('required') && control.touched;
  }

}
