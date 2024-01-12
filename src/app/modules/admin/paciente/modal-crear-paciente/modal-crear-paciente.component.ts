import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PacienteService } from '../paciente.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';
import { TEXTO_CONSULTA_EXITOSA } from 'src/app/core/utils/constants.utils';
import { StepperOrientation } from '@angular/cdk/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-modal-crear-paciente',
  templateUrl: './modal-crear-paciente.component.html'
})
export class ModalCrearPacienteComponent {
  estaCargando: boolean = false;

  // Formularios
  personalForm: FormGroup;
  socieconomicoForm: FormGroup;
  familiarForm: FormGroup;
  consultaForm: FormGroup;
  stepperOrientation: Observable<StepperOrientation>;
  //Fin formularios

  constructor(
    public matRef: MatDialogRef<ModalCrearPacienteComponent>,
    private _formBuilder: FormBuilder,
    private _pacienteService: PacienteService,
    private _toastrService: ToastrService,
    breakpointObserver: BreakpointObserver
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
    this._crearFormularios();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Métodos privados
  // -----------------------------------------------------------------------------------------------------
  private _crearFormularios() {
    this._crearFormPersonal();
    this._crearFormSocioeconomico();
    this._crearFormFamiliar();
    this._crearFormConsulta();
  }

  private _crearFormPersonal() {
    this.personalForm = this._formBuilder.group({
      apPaterno: ['', [Validators.required]],
      apMaterno: ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      dni: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]],
      lugarNacimiento: ['', [Validators.required]],
      direccion: ['',],
      departamento: ['', [Validators.required]],
      provincia: ['', [Validators.required]],
      distrito: ['', [Validators.required]],
      numeroContacto: ['', [Validators.required]],
      sexo: ['', [Validators.required]],
      nacionalidad: ['',],
      correo: ['',],
      carrera: ['',],
      ocupacion: ['',]
    });
  }
  private _crearFormSocioeconomico() {
    this.socieconomicoForm = this._formBuilder.group({
      tipoVivienda: ['',],
      habitacionesCamas: ['',],
      serviciosBasicos: ['',],
      gastosMensuales: ['',],
      cantidadFamiliares: ['',],
      tipoSeguro: ['',],
      categorizacionSocioeconomica: ['',]
    });
  }

  private _crearFormFamiliar() {
    this.familiarForm = this._formBuilder.group({
      contactoEmergencia: ['',],
      parentezco: ['',],
      numeroEmergencia: ['',],
      enfermedadesDelLosFamiliares: ['',]
    });
  }

  private _crearFormConsulta() {
    this.consultaForm = this._formBuilder.group({
      atencionSolicita: ['',],
      proyectoRefiere: ['',],
      motivoConsulta: ['',],
      modalidad: ['',],
      horarioDisponibilidad: ['',],
      siFormasParteDeNic: ['',],
      colaboracionEconomica: ['',],
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Métodos públicos
  // -----------------------------------------------------------------------------------------------------
  async procesarSolicitud() {
    this.estaCargando = true;

    // if (this.form.invalid) {
    //   this.estaCargando = false;
    //   return;
    // }

    try {
      // const http$ = this._pacienteService.crear$(this.form.value);
      // await lastValueFrom(http$);
      this._toastrService.success(TEXTO_CONSULTA_EXITOSA);
      this.matRef.close('OK');
    } catch (error) {
      this._toastrService.error(error.message.ERROR);
    } finally {
      this.estaCargando = false;
    }
  }
}
