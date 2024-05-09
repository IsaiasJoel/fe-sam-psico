import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PsicologoService } from '../psicologo.service';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { TEXTO_CONSULTA_EXITOSA } from 'src/app/core/utils/constants.utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-psicologo',
  templateUrl: './crear-psicologo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrearPsicologoComponent {
  comboSexo: any[] = [];
  comboNacionalidad: string[] = [];

  form: FormGroup;
  estaCargando: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _psicologoService: PsicologoService,
    private _toastrService: ToastrService,
    private _router: Router
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
      sexo: [/*OPCIONES_SEXO[1].nombre*/, [Validators.required]],
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
  async procesarSolicitud() {
    this.estaCargando = true;

    if (this.form.invalid) {
      this.estaCargando = false;
      return;
    }

    try {
      const http$ = this._psicologoService.crear$(this.form.value);
      await lastValueFrom(http$);
      this._toastrService.success(TEXTO_CONSULTA_EXITOSA);
      this._router.navigate(['/psicologos/']);
    } catch (error) {
      this._toastrService.error(error.message.ERROR);
    } finally {
      this.estaCargando = false;
    }
  }

  cambioSelectColegiado() {
    this.form.get('numeroColegiatura').setValue('');
  }

  regresarAListar() {
    this._router.navigate(['/psicologos/']);
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
