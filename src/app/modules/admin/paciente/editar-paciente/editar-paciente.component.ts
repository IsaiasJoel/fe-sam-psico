import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PacienteService } from '../paciente.service';
import { ToastrService } from 'ngx-toastr';
import { concatMap, forkJoin, lastValueFrom } from 'rxjs';
import { TEXTO_CONSULTA_EXITOSA } from 'src/app/core/utils/constants.utils';
import { UbigeoService } from 'src/app/shared/services/ubigeo.service';
import { SERVICIOS_BASICOS } from 'src/app/shared/data/shared.data';
import { ActivatedRoute, Router } from '@angular/router';
import { SweetAlertService } from 'src/app/core/modals/sweet-alert.service';
import { DTOSexoCombo, Pais } from 'src/app/shared/models/shared.models';
import { ControlFecha, FechaService } from 'src/app/shared/services/fecha.service';
import { DTOServicioCombo } from '../../servicio/servicio.model';
import { DTOAmbienteCombo } from '../../ambiente/ambiente.model';
import { PaisService } from 'src/app/shared/services/pais.service';
import { SexoService } from 'src/app/shared/services/sexo.service';
import { ServiciosService } from '../../servicio/servicios.service';
import { AmbienteService } from '../../ambiente/ambiente.service';

@Component({
  selector: 'app-editar-paciente',
  templateUrl: './editar-paciente.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditarPacienteComponent {
  // -----------------------------------------------------------------------------------------------------
  // @ Variables
  // -----------------------------------------------------------------------------------------------------
  comboServiciosBasicos: string[] = SERVICIOS_BASICOS;
  departamentos: string[] = [];
  provincias: string[] = [];
  distritos: string[] = [];
  form: FormGroup;
  paises: Pais[] = [];
  sexos: DTOSexoCombo[] = [];
  controlesFecha: ControlFecha;
  servicios: DTOServicioCombo[] = [];
  ambientes: DTOAmbienteCombo[] = [];

  // -----------------------------------------------------------------------------------------------------
  // @ Ciclo de vida
  // -----------------------------------------------------------------------------------------------------
  constructor(
    public fechaService: FechaService,

    private _formBuilder: FormBuilder,
    private _pacienteService: PacienteService,
    private _toastrService: ToastrService,
    private _ubigeoService: UbigeoService,
    private _router: Router,
    private _sweetAlertService: SweetAlertService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _paisService: PaisService,
    private _sexoService: SexoService,
    private _servicioService: ServiciosService,
    private _ambienteService: AmbienteService,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._crearFormulario();
    this._suscribirseAlUbigeo();
    this._suscribirseALosControlesDeFecha();
    this._cargarDatosIniciales();
    this._obtenerObjeto();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Métodos privados
  // -----------------------------------------------------------------------------------------------------
  private _obtenerObjeto() {
    this._route.paramMap
      .pipe(
        concatMap(params => {
          const id = Number(params.get('id'));
          return this._pacienteService.ver$(id);
        })
      ).subscribe(paciente => {
        this.form.patchValue(paciente);
        this._changeDetectorRef.markForCheck();
      });
  }

  private _cargarDatosIniciales() {
    const paises$ = this._paisService.paises$();
    const sexos$ = this._sexoService.sexos$();
    const servicios$ = this._servicioService.listarCombo$();
    const ambientes$ = this._ambienteService.listarCombo$();

    return forkJoin({
      paises: paises$,
      sexos: sexos$,
      servicios: servicios$,
      ambientes: ambientes$
    }).subscribe(data => {
      this._setearData(data);
      this._setearValoresPredeterminados();
    });
  }

  private _setearData({ paises, sexos, servicios, ambientes }) {
    this.ambientes = ambientes;
    this.servicios = servicios;
    this.sexos = sexos;
    this.paises = paises;
    this._changeDetectorRef.markForCheck();
  }

  private _setearValoresPredeterminados() {
    const servicioPorDefecto = this.servicios.find(serv => serv.codigo === 'SE01');
    const sexoPorDefecto = this.sexos.find(sexo => sexo.codigo === 'SX09');
    const paisPorDefecto = this.paises.find(pais => pais.iso == 'PE');
    const ambientePorDefecto = this.ambientes.length > 0 ? this.ambientes[0] : undefined;

    this.form.patchValue({
      servicio: servicioPorDefecto,
      sexo: sexoPorDefecto,
      pais: paisPorDefecto,
      ambiente: ambientePorDefecto
    });
    this._changeDetectorRef.markForCheck();
  }

  private _suscribirseAlUbigeo() {
    this._ubigeoService.ubigeo$
      .subscribe(ubigeo => {
        this.departamentos = ubigeo.departamento.departamentos;
        this.provincias = ubigeo.provincia.provinciasPorDepartamento;
        this.distritos = ubigeo.distrito.distritosPorProvincia;

        this.form.patchValue({
          ubigeo: {
            departamento: ubigeo.departamento.seleccionado,
            provincia: ubigeo.provincia.seleccionado,
            distrito: ubigeo.distrito.seleccionado
          }
        })
        this._changeDetectorRef.markForCheck();
      });
  }

  private _suscribirseALosControlesDeFecha() {
    this.controlesFecha = this.fechaService.controlesFecha;
    this.fechaService.fechaSeleccionada$
      .subscribe(fecha => {
        this.form.patchValue({ fecNacimiento: fecha });
      })
  }

  private _crearFormulario() {
    this.form = this._formBuilder.group({
      // Personal
      id: [null, [Validators.required]],
      apPaterno: ['', [Validators.required]],
      apMaterno: ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      docIdentidad: ['', [Validators.required]],
      sexo: [null, [Validators.required]],
      fecNacimiento: [null, [Validators.required]],
      pais: [null, []],
      lugarNacimiento: ['', [Validators.required]],
      direccion: ['',],
      ubigeo: this._formBuilder.group({
        departamento: [null, [Validators.required]],
        provincia: [null, [Validators.required]],
        distrito: [null, [Validators.required]],
      }),
      correo: ['',],
      ocupacion: ['',],
      numeroContacto: ['', [Validators.required]],
      carreraProfesion: [null,],
      organizacionRefiere: [null, []],
      vinculoNic: ['SV', []],
      habilitado: [],

      // Atencion
      modalidad: ['P', []],
      motivoConsulta: [null, []],
      horarioDisponibilidad: ['M', []],
      observacion: [null, []],
      terminoAtenciones: [false, []],
      servicio: [],
      ambiente: [],

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
    this._changeDetectorRef.markForCheck();
  }

  listarDistritoPorProvincia$(provinciaSeleccionada: string) {
    this._ubigeoService.provincia = provinciaSeleccionada;
    this._changeDetectorRef.markForCheck();
  }

  cambioValorNacionalidad(nuevoValor: Pais) {
    if (nuevoValor.iso == 'PE') {
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
}
