import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PacienteService } from '../paciente.service';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';
import { TEXTO_CONSULTA_EXITOSA } from 'src/app/core/utils/constants.utils';
import { UbigeoService } from 'src/app/shared/services/ubigeo.service';
import { ApiResponse } from 'src/app/core/models/api-response.interface';
import { OPCIONES_SEXO, SERVICIOS_BASICOS, TEXTO_SELECCIONE } from 'src/app/shared/data/shared.data';
import { OpcionesComboSexo, Pais } from 'src/app/shared/models/shared.models';
import { Router } from '@angular/router';
import { SweetAlertService } from 'src/app/core/modals/sweet-alert.service';
import { PaisService } from 'src/app/shared/services/pais.service';

@Component({
  selector: 'app-crear-paciente',
  templateUrl: './crear-paciente.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrearPacienteComponent {
  comboSexo: OpcionesComboSexo[] = OPCIONES_SEXO;
  comboNacionalidad: Pais[] = [];
  comboServiciosBasicos: string[] = SERVICIOS_BASICOS;
  departamentos: string[] = [];
  provincias: string[] = [];
  distritos: string[] = [];
  textoSeleccione: string = TEXTO_SELECCIONE;
  form: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _pacienteService: PacienteService,
    private _toastrService: ToastrService,
    private _ubigeoService: UbigeoService,
    private _router: Router,
    private _sweetAlertService: SweetAlertService,
    private _paisService: PaisService,
    private _changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this._crearFormulario();
    this._cargarPaises();
    this._cargarUbigeos();
    this._changeDetectorRef.markForCheck();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Métodos privados
  // -----------------------------------------------------------------------------------------------------
  private _cargarUbigeos() {
    this._ubigeoService.ubigeo$.subscribe(ubigeo => {
      this.departamentos = ubigeo.departamento.departamentos;
      this.form.get('departamento').setValue(ubigeo.departamento.seleccionado);
      this.provincias = ubigeo.provincia.provinciasPorDepartamento;
      this.form.get('provincia').setValue(ubigeo.provincia.seleccionado);
      this.distritos = ubigeo.distrito.distritosPorProvincia;
      this.form.get('distrito').setValue(ubigeo.distrito.seleccionado);
      this._changeDetectorRef.markForCheck();
    });
  }

  private async _cargarPaises() {
    const http$ = this._paisService.paises$();
    const respServidor: ApiResponse = await lastValueFrom(http$);
    this.comboNacionalidad = respServidor.data;
    this.form.patchValue({
      nacionalidad: this.comboNacionalidad.find(pais => pais.iso == 'PE')
    });
  }

  private _crearFormulario() {
    this.form = this._formBuilder.group({
      // Personal
      apPaterno: ['', [Validators.required]],
      apMaterno: ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      dni: ['', [Validators.required]],
      fechaNacimiento: [null, [Validators.required]],
      lugarNacimiento: ['', [Validators.required]],
      direccion: ['',],
      departamento: [null, [Validators.required]],
      provincia: [null, [Validators.required]],
      distrito: [null, [Validators.required]],
      numeroContacto: ['', [Validators.required]],
      sexo: ['SELECCIONE', [Validators.required]],
      nacionalidad: [null, []],
      correo: ['',],
      carrera: ['',],
      ocupacion: ['',],

      // Socioeconómico
      tipoVivienda: ['',],
      habitacionesCamas: ['',],
      serviciosBasicos: ['',],
      gastosMensuales: ['',],
      cantidadFamiliares: ['',],
      tipoSeguro: ['',],
      categorizacionSocioeconomica: ['',],

      // Familiar
      contactoEmergencia: ['',],
      parentezco: ['',],
      numeroEmergencia: ['',],
      enfermedadesDelLosFamiliares: ['',]
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Métodos públicos
  // -----------------------------------------------------------------------------------------------------
  async procesarSolicitud() {
    if (this.form.invalid) {
      this._sweetAlertService.mostrarMensaje('¡Cuidado!', 'Algunos datos ingresados son inválidos', 'warning');
      return;
    }

    const http$ = this._pacienteService.crear$(this.form.value);
    await lastValueFrom(http$);
    this._toastrService.success(TEXTO_CONSULTA_EXITOSA);
    this._router.navigate(['/pacientes/']);
  }

  listarProvinciaPorDepartamento$(departamentoSeleccionado: string) {
    this._ubigeoService.departamento = departamentoSeleccionado;
  }

  listarDistritoPorProvincia$(provinciaSeleccionada: string) {
    this._ubigeoService.provincia = provinciaSeleccionada;
  }

  cambioValorNacionalidad(nuevoValor: Pais) {
    if (nuevoValor.iso == 'PE') {
      this._cargarUbigeos();
      this.form.get('departamento').enable();
      this.form.get('provincia').enable();
      this.form.get('distrito').enable();
    } else {
      this.departamentos = [];
      this.provincias = [];
      this.distritos = [];
      this.form.get('departamento').disable();
      this.form.get('provincia').disable();
      this.form.get('distrito').disable();
    }
  }

  irAPantallaListar() {
    this._router.navigate(['/pacientes/']);
  }
}
