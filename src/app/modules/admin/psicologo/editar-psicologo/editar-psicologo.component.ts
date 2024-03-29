import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NACIONALIDADES, OPCIONES_SEXO } from 'src/app/shared/data/shared.data';
import { OpcionesComboSexo } from 'src/app/shared/models/shared.models';
import { PsicologoService } from '../psicologo.service';
import { ToastrService } from 'ngx-toastr';
import { FORMATO_FECHA_DMY, TEXTO_CONSULTA_EXITOSA } from 'src/app/core/utils/constants.utils';
import { lastValueFrom } from 'rxjs';
import { DTOPsicologoEncontrado } from '../psicologo.models';
import { ApiResponse } from 'src/app/core/models/api-response.interface';
import { SweetAlertService } from 'src/app/core/modals/sweet-alert.service';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { VER_USUARIO_ENCONTRADO } from '../modal-ver-psicologo/modal-ver-psicologo.mock';

@Component({
  selector: 'app-editar-psicologo',
  templateUrl: './editar-psicologo.component.html'
})
export class EditarPsicologoComponent {
  comboSexo: OpcionesComboSexo[] = OPCIONES_SEXO;
  comboNacionalidad: string[] = NACIONALIDADES;

  form: UntypedFormGroup;
  estaCargando: boolean = false;
  estaCargandoFormulario: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _psicologoService: PsicologoService,
    private _toastrService: ToastrService,
    private _sweetAlertService: SweetAlertService,
    private _router: Router,
    private _activateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._crearYCargarFormulario();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Métodos privados
  // -----------------------------------------------------------------------------------------------------
  private _crearYCargarFormulario() {
    this._crearFormulario();
    this._cargarDatosAlFormulario();
  }

  private async _cargarDatosAlFormulario() {
    this.estaCargandoFormulario = true;
    const id: number = Number.parseInt(this._activateRoute.snapshot.paramMap.get('id'));

    try {
      // const http$ = this._psicologoService.buscarPsicologoPorId$(id);
      // const respuestaServidor: ApiResponse = await lastValueFrom(http$);

      let psicologo: DTOPsicologoEncontrado = VER_USUARIO_ENCONTRADO;

      //Formatear y setear la fecha
      psicologo.fechaNacimiento = moment(psicologo.fechaNacimiento).format(FORMATO_FECHA_DMY)

      this.form.patchValue(psicologo);


    } catch (error) {
      const mensaje: string = error.error.message.ERROR;
      this._sweetAlertService.mostrarMensaje('Error', mensaje, 'error');
    }
    this.estaCargandoFormulario = false;
  }

  private _crearFormulario() {
    this.form = this._formBuilder.group({
      id: [null, [Validators.required]],
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
  async procesarSolicitud() {
    this.estaCargando = true;
    console.log(this.form);

    if (this.form.invalid) {
      this.estaCargando = false;
      return;
    }

    try {
      const http$ = this._psicologoService.editar$(this.form.value);
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

  get esColegiado(): boolean {
    return this.form.get('colegiado').value;
  }

  irAPantallaListar() {
    this._router.navigate(['/psicologos/']);
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
