import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PacienteService } from '../paciente.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, lastValueFrom, map } from 'rxjs';
import { FORMATO_FECHA_DMY, TEXTO_CONSULTA_EXITOSA, TEXTO_CONSULTA_FALLO } from 'src/app/core/utils/constants.utils';
import { StepperOrientation } from '@angular/cdk/stepper';
import { BreakpointObserver } from '@angular/cdk/layout';
import { UbigeoService } from 'src/app/shared/services/ubigeo.service';
import { ApiResponse } from 'src/app/core/models/api-response.interface';
import { NACIONALIDADES, OPCIONES_SEXO, SERVICIOS_BASICOS, TEXTO_SELECCIONE } from 'src/app/shared/data/shared.data';
import { OpcionesComboSexo } from 'src/app/shared/models/shared.models';
import { ActivatedRoute, Router } from '@angular/router';
import { DTOPacienteEncontrado } from '../paciente.models';
import * as moment from 'moment';
import { SweetAlertService } from 'src/app/core/modals/sweet-alert.service';

@Component({
  selector: 'app-editar-paciente',
  templateUrl: './editar-paciente.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditarPacienteComponent {
  comboSexo: OpcionesComboSexo[] = OPCIONES_SEXO;
  comboNacionalidad: string[] = NACIONALIDADES;
  comboServiciosBasicos: string[] = SERVICIOS_BASICOS;

  estaCargando: boolean = false;
  departamentos: string[] = [];
  provincias: string[] = [];
  distritos: string[] = [];

  textoSeleccione: string = TEXTO_SELECCIONE;

  // Formularios
  personalForm: FormGroup;
  socieconomicoForm: FormGroup;
  familiarForm: FormGroup;
  stepperOrientation: Observable<StepperOrientation>;
  //Fin formularios

  constructor(
    breakpointObserver: BreakpointObserver,
    private _formBuilder: FormBuilder,
    private _pacienteService: PacienteService,
    private _toastrService: ToastrService,
    private _ubigeoService: UbigeoService,
    private _router: Router,
    private _activateRoute: ActivatedRoute,
    private _sweetAlertService: SweetAlertService
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
    //cargar data
    this._cargarDepartamentos();
    this._crearYCargarFormulario();
    this._inicializarUbicacionPorDefecto();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Métodos privados
  // -----------------------------------------------------------------------------------------------------
  private _crearFormularios() {
    this._crearFormPersonal();
    this._crearFormSocioeconomico();
    this._crearFormFamiliar();
  }

  private _crearYCargarFormulario() {
    this._crearFormularios();
    this._cargarDatosAlFormulario();
  }

  private async _cargarDatosAlFormulario() {
    this.estaCargando = true;
    const id = this._activateRoute.snapshot.paramMap.get('id');

    try {
      const http$ = this._pacienteService.buscarPorId$(id);
      const respuestaServidor: ApiResponse = await lastValueFrom(http$);
      let paciente: DTOPacienteEncontrado = respuestaServidor.data;

      this.personalForm.patchValue(paciente);
      this.socieconomicoForm.patchValue(paciente);
      this.familiarForm.patchValue(paciente);

      //Formatear y setear la fecha
      this.personalForm.patchValue({
        fechaNacimiento: new Date(paciente.fechaNacimiento)
      });

    } catch (error) {
      const mensaje: string = error.error.message.ERROR;
      this._sweetAlertService.mostrarMensaje('Error', mensaje, 'error');
    }
    this.estaCargando = false;
  }

  private async _inicializarUbicacionPorDefecto() {
    const departamento: string = this.personalForm.get('departamento').value;

    //setear provincia por defecto
    this.listarProvinciaPorDepartamento$(departamento)
    const provincia: string = 'CHICLAYO';
    this.listarDistritoPorProvincia$(provincia);
    this.personalForm.get('provincia').setValue(provincia);

    //setear distritos por defecto
    const distrito: string = 'CHICLAYO';
    this.personalForm.get('distrito').setValue(distrito);
  }

  private async _cargarDepartamentos() {
    try {
      this.estaCargando = true;
      const http$ = this._ubigeoService.listarDepartamentos$();
      const respuestaServidor: ApiResponse = await lastValueFrom(http$);
      this.departamentos = respuestaServidor.data;
    } catch (error) {
      this._toastrService.error(TEXTO_CONSULTA_FALLO);
    } finally {
      this.estaCargando = false;
    }
  }

  private _crearFormPersonal() {
    this.personalForm = this._formBuilder.group({
      id: ['', [Validators.required]],
      apPaterno: ['', [Validators.required]],
      apMaterno: ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      dni: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]],
      lugarNacimiento: ['', [Validators.required]],
      direccion: ['',],
      departamento: ['LAMBAYEQUE', [Validators.required]],
      provincia: ['SELECCIONE', [Validators.required]],
      distrito: ['SELECCIONE', [Validators.required]],
      numeroContacto: ['', [Validators.required]],
      sexo: ['SELECCIONE', [Validators.required]],
      nacionalidad: ['SELECCIONE',],
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

  // private _crearFormConsulta() {
  //   this.consultaForm = this._formBuilder.group({
  //     atencionSolicita: ['',],
  //     proyectoRefiere: ['',],
  //     motivoConsulta: ['',],
  //     modalidad: ['',],
  //     horarioDisponibilidad: ['',],
  //     siFormasParteDeNic: ['',],
  //     colaboracionEconomica: ['',],
  //   });
  // }

  /**Al menos un formulario es inválido */
  private _formulariosSonInvalidos(): boolean {
    return this.personalForm.invalid || this.socieconomicoForm.invalid || this.familiarForm.invalid;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Métodos públicos
  // -----------------------------------------------------------------------------------------------------
  async procesarSolicitud() {
    this.estaCargando = true;

    if (this._formulariosSonInvalidos()) {
      this.estaCargando = false;
      return;
    }

    try {
      const http$ = this._pacienteService.editar$(this.personalForm.value, this.socieconomicoForm.value, this.familiarForm.value);
      await lastValueFrom(http$);
      this._toastrService.success(TEXTO_CONSULTA_EXITOSA);
      this._router.navigate(['/pacientes/']);
    } catch (error) {
      this._toastrService.error(error.message);
    } finally {
      this.estaCargando = false;
    }
  }

  async listarProvinciaPorDepartamento$(departamentoSeleccionado: string) {
    //reiniciar combo provincias
    this.personalForm.get('provincia').setValue(this.textoSeleccione);
    this.provincias = [];

    //reinicar combo distritos
    this.personalForm.get('distrito').setValue(this.textoSeleccione);
    this.distritos = [];

    const http$ = this._ubigeoService.listarProvinciaPorDepartamento$(departamentoSeleccionado);
    const respuestaServidor: ApiResponse = await lastValueFrom(http$);
    this.provincias = respuestaServidor.data;
  }

  async listarDistritoPorProvincia$(provinciaSeleccionada: any) {
    this.personalForm.get('distrito').setValue(this.textoSeleccione);
    this.distritos = [];

    const http$ = this._ubigeoService.listarDistritoPorProvincia$(provinciaSeleccionada);
    const respuestaServidor = await lastValueFrom(http$);
    this.distritos = respuestaServidor.data;
  }

  irAPantallaListar() {
    this._router.navigate(['/pacientes/']);
  }
}
