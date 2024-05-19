import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { forkJoin, lastValueFrom } from 'rxjs';
import { PacienteService } from './paciente.service';
import { DTOPacienteListar } from './paciente.models';
import { PaisService } from 'src/app/shared/services/pais.service';
import { DTOSexoCombo, Pais } from 'src/app/shared/models/shared.models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SweetAlertService } from 'src/app/core/modals/sweet-alert.service';
import { SexoService } from 'src/app/shared/services/sexo.service';
import { UbigeoService } from 'src/app/shared/services/ubigeo.service';
import { TEXTO_SELECCIONE } from 'src/app/shared/data/shared.data';
import { ControlFecha, FechaService } from 'src/app/shared/services/fecha.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PacienteComponent {
  //=====================================
  // Variables
  //=====================================
  // accion: 'crear' | 'editar' | 'listar' | 'ver-historia' = 'listar';
  // filtroNombres: string;
  // // form: FormGroup;
  // // pacientes: DTOPacienteListar[] = [];
  // paises: Pais[] = [];
  // sexos: DTOSexoCombo[] = [];
  // departamentos: string[] = [];
  // provincias: string[] = [];
  // distritos: string[] = [];
  // textoSeleccione: string = TEXTO_SELECCIONE;
  // controlesFecha: ControlFecha;

  //===================================================
  // Ciclo de vida
  //===================================================
  constructor(
    // private _pacienteService: PacienteService,
    // private _sweetAlertService: SweetAlertService,
    // private _changeDetectorRef: ChangeDetectorRef,
    // private _paisService: PaisService,
    // private _formBuilder: FormBuilder,
    // private _ubigeoService: UbigeoService,
    // private _sexoService: SexoService,
    // public fechaService: FechaService
  ) {
  }

  ngOnInit(): void {
    // this._crearFormulario();
    // this._cargarData();
    // this._suscribirseAlUbigeo();
    // this._suscribirseALosControlesDeFecha();
  }

  //=====================================
  // Métodos privados
  //=====================================
  // private _suscribirseAlUbigeo() {
  //   this._ubigeoService.ubigeo$
  //     .subscribe(ubigeo => {
  //       this.departamentos = ubigeo.departamento.departamentos;
  //       this.provincias = ubigeo.provincia.provinciasPorDepartamento;
  //       this.distritos = ubigeo.distrito.distritosPorProvincia;

  //       this.form.patchValue({
  //         ubigeo: {
  //           departamento: ubigeo.departamento.seleccionado,
  //           provincia: ubigeo.provincia.seleccionado,
  //           distrito: ubigeo.distrito.seleccionado
  //         }
  //       })
  //       this._changeDetectorRef.markForCheck();
  //     });
  // }

  // private _suscribirseALosControlesDeFecha() {
  //   this.controlesFecha = this.fechaService.controlesFecha;
  //   this.fechaService.fechaSeleccionada$
  //     .subscribe(fecha => {
  //       this.form.patchValue({ fecNacimiento: fecha });
  //     })
  // }

  // private _cargarData() {
  //   const httpPacientes$ = this._pacienteService.listarTodos$(this.filtroNombres);
  //   const httpPaises$ = this._paisService.paises$();
  //   const httpSexos$ = this._sexoService.sexos$();
  //   return forkJoin({
  //     pacientes: httpPacientes$,
  //     paises: httpPaises$,
  //     sexos: httpSexos$
  //   }).subscribe(data => {
  //     this.sexos = data.sexos;
  //     this.form.patchValue({ sexo: this.sexos.find(x => x.codigo === 'SX09') });
  //     this.paises = data.paises;
  //     this.form.patchValue({ pais: this.paises.find(pais => pais.iso == 'PE') });
  //     this.pacientes = data.pacientes;
  //     this._changeDetectorRef.markForCheck();
  //   });
  // }

  // private _crearFormulario() {
  //   this.form = this._formBuilder.group({
  //     // Personal
  //     // id: [null, [Validators.required]],
  //     // apPaterno: [null, [Validators.required]],
  //     // apMaterno: [null, [Validators.required]],
  //     // nombres: [null, [Validators.required]],
  //     // docIdentidad: [null, [Validators.required]],
  //     // sexo: [null, [Validators.required]],
  //     // fecNacimiento: [null, [Validators.required]],
  //     pais: [null, []],
  //     lugarNacimiento: [null, [Validators.required]],
  //     direccion: [null,],
  //     ubigeo: this._formBuilder.group({
  //       departamento: [null, [Validators.required]],
  //       provincia: [null, [Validators.required]],
  //       distrito: [null, [Validators.required]],
  //     }),
  //     correo: [null,],
  //     ocupacion: [null,],
  //     carreraProfesion: [null,],
  //     numeroContacto: [null, [Validators.required]],
  //     contactoEmergencia: [null,],
  //     organizacionRefiere: [null, []],
  //     motivoConsulta: [null, []],
  //     horarioDisponibilidad: ['M', []],
  //     observacion: [null, []],
  //     terminoAtenciones: [false, []]
  //   });
  // }

  // private async _crear() {
  //   const http$ = this._pacienteService.crear$(this.form.value);
  //   await lastValueFrom(http$);
  // }

  private async _editar() {
    // const http$ = this._pacienteService.editar$(this.form.value);
    // await lastValueFrom(http$);
  }

  private async _actualizarLista() {
    // const http$ = this._pacienteService.listarTodos$();
    // await lastValueFrom(http$);
  }

  // private _reiniciarForm() {
  //   this.form.reset();
  //   const controlUbigeo = this.form.get('ubigeo');
  //   this.form.patchValue({
  //     pais: this.paises.find(pais => pais.iso == 'PE'),
  //     sexo: this.sexos.find(x => x.codigo == 'SX09'),
  //     ubigeo: {
  //       departamento: 'LAMBAYEQUE',
  //       provincia: 'CHICLAYO',
  //       distrito: 'CHICLAYO'
  //     },
  //     horarioDisponibilidad: 'M'
  //   });
  // }

  //=====================================
  // Métodos públicos
  //=====================================
  // procesarSolicitud() {
  //   this._sweetAlertService.preguntarSiNo('¿Está seguro que desea realizar esta acción?')
  //     .then(async respuesta => {
  //       if (respuesta.isConfirmed) {
  //         console.log(this.form.value);
  //         (this.accion == 'crear') ? await this._crear() : await this._editar();
  //         this._actualizarLista();
  //         // this.accion = 'ninguno';
  //       }
  //     });
  // }

  // async ver(id: number) {
  //   this.accion = 'editar';
  //   const httpUsuario$ = this._pacienteService.ver$(id);
  //   const paciente = await lastValueFrom(httpUsuario$);
  //   this.form.patchValue(paciente);
  //   this.form.patchValue({
  //     sexo: this.sexos.find(x => x.codigo == paciente.sexo.codigo),
  //     pais: this.paises.find(x => x.id == paciente.pais.id),
  //     ubigeo: paciente.ubigeo
  //   })
  //   this._changeDetectorRef.markForCheck();
  // }

  // async crear() {
  //   this.accion = 'crear';
  //   this._reiniciarForm();
  // }

  // cancelar() {
  //   // this.accion = 'ninguno';
  //   this._reiniciarForm();
  //   this._actualizarLista();
  // }

  // listarProvinciaPorDepartamento$(departamentoSeleccionado: string) {
  //   this._ubigeoService.departamento = departamentoSeleccionado;
  // }

  // listarDistritoPorProvincia$(provinciaSeleccionada: string) {
  //   this._ubigeoService.provincia = provinciaSeleccionada;
  // }

  // cambioValorNacionalidad(nuevoValor: Pais) {
  //   if (nuevoValor.iso == 'PE') {
  //     // this._cargarUbigeos();
  //     this.form.get('departamento').enable();
  //     this.form.get('provincia').enable();
  //     this.form.get('distrito').enable();
  //   } else {
  //     this.departamentos = [];
  //     this.provincias = [];
  //     this.distritos = [];
  //     this.form.get('departamento').disable();
  //     this.form.get('provincia').disable();
  //     this.form.get('distrito').disable();
  //   }
  // }

  //=====================================
  // Modales
  //=====================================

}
