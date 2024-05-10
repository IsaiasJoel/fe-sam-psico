import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { UsuarioService } from './usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { SweetAlertService } from 'src/app/core/modals/sweet-alert.service';
import { DTOUsuarioListar } from './usuario.models';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DTOSexoCombo, Pais } from 'src/app/shared/models/shared.models';
import { PaisService } from 'src/app/shared/services/pais.service';
import { SexoService } from 'src/app/shared/services/sexo.service';
import { RolService } from '../rol/rol.service';
import { DTORolListar } from '../rol/rol.model';

@Component({
  selector: 'usuario',
  templateUrl: './usuario.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsuarioComponent {
  accion: 'crear' | 'editar' | 'ninguno' = 'ninguno';
  filtroNombres: string = '';
  form: FormGroup;
  usuarios: DTOUsuarioListar[] = [
    { id: 1, nombresCompletos: "Juan Pérez Domínguez", activo: true, tipo: "Administrador" },
    { id: 2, nombresCompletos: "María López Montalbán", activo: false, tipo: "Usuario Regular" },
    { id: 3, nombresCompletos: "Carlos García Piscoya", activo: true, tipo: "Usuario Regular" }
  ];

  paises: Pais[] = [];
  sexos: DTOSexoCombo[] = [];

  //==========================================================================
  // Ciclo de vida
  //==========================================================================
  constructor(
    private _usuarioService: UsuarioService,
    private _matDialog: MatDialog,
    private _sweetAlertService: SweetAlertService,
    private _changeDetectionRef: ChangeDetectorRef,
    private _formBuilder: FormBuilder,
    private _paisService: PaisService,
    private _sexoService: SexoService,
    private _rolService: RolService
  ) { }

  ngOnInit(): void {
    this._crearFormulario();
    this._obtenerPaises();
    this._obtenerSexos();
  }

  //==========================================================================
  // Métodos privados
  //==========================================================================
  private async _listarUsuarios() {
    // const http$ = this._usuarioService.listarUsuariosPaginacion$(this._paginator?.pageIndex, this._paginator?.pageSize, this.filtroApellidosNombres, this.filtroEstado);
    // const respuestaServidor: ApiResponse = await lastValueFrom(http$);
    // this._cargarDatosDelServidorAlDatasource(respuestaServidor.data);
    this._changeDetectionRef.markForCheck();
  }

  private _crearFormulario() {
    this.form = this._formBuilder.group({
      // Usuario
      dni: [null, [Validators.required]],
      nombres: [null, [Validators.required]],
      apPaterno: [null, [Validators.required]],
      apMaterno: [null, [Validators.required]],
      fecNacimiento: [null, [Validators.required]],
      sexo: [null, []],
      pais: [null, []],
      celular: [null, []],
      carreraProfesional: [null, [Validators.required]],
      username: [null, [Validators.required]],
      esPsicologo: [null, [Validators.required]],
      habilitado: [null, [Validators.required]],

      roles: this._formBuilder.array([]),

      // Psicologo
      universidad: [null, []],
      anioEgreso: [null, []],
      esColegiado: [null, []],
      numColegiatura: [null, []],
      especialidad: [null, []],
      resumenProfesional: [null, []]
    });
  }

  private async _obtenerPaises() {
    const http$ = this._paisService.paises$();
    this.paises = await lastValueFrom(http$);
    this.form.patchValue({
      pais: this.paises.find(pais => pais.iso == 'PE')
    });
    this._changeDetectionRef.markForCheck();
  }

  private async _obtenerSexos() {
    const http$ = this._sexoService.sexos$();
    this.sexos = await lastValueFrom(http$);
    this.form.patchValue({
      sexo: this.sexos.find(x => x.codigo == 'SX09')
    });
    this._changeDetectionRef.markForCheck();
  }

  private async _obtenerRoles() {
    const http$ = this._rolService.listar$();
    // const roles: DTORolListar[] = await lastValueFrom(http$);
    http$.subscribe(roles => {
      this._cargarRolesAlFormulario(roles);
      this._changeDetectionRef.markForCheck();
    })
  }

  private _reiniciarForm() {
    this.form.reset();
    this.form.patchValue({
      pais: this.paises.find(pais => pais.iso == 'PE'),
      sexo: this.sexos.find(x => x.codigo == 'SX09'),
      // roles: []
    });
  }

  private _cargarRolesAlFormulario(roles: DTORolListar[]) {
    roles.forEach(rol => this._cargarItemRol(rol));
  }

  private _cargarItemRol(item: DTORolListar) {
    const nuevoItem = this._formBuilder.group({
      id: [item.id, [Validators.required]],
      nombre: [item.nombre, [Validators.required]]
    });
    this.roles.push(nuevoItem);
  }

  //==========================================================================
  // Métodos públicos
  //==========================================================================
  filtrar(event: KeyboardEvent) {
    if (event.key != 'Enter') return;
    this._listarUsuarios();
  }

  clickFiltrar() {
    this._listarUsuarios();
  }

  // async resetearContrasenia(codigoUsuario: string) {
  //   const ref = await this._sweetAlertService.preguntarSiNo('Esta accion reestablecerá la contraseña por defecto');
  //   if (!ref.isConfirmed) return;
  //   const respuestaServidor: ApiResponse = await lastValueFrom(this._usuarioService.resetContrasenia$(codigoUsuario));
  //   if (!respuestaServidor.successful) return;
  // }

  cancelar() {
    this.accion = 'ninguno';
    this._reiniciarForm();
    this._obtenerRoles();
  }

  procesarSolicitud() {
    this._sweetAlertService.preguntarSiNo('¿Desea agregar un nuevo usuario?')
      .then(async respuesta => {
        if (respuesta.isConfirmed) {
          console.log(this.form.value);
          // (this.accion == 'crear') ? await this._crear() : await this._editar();
          await this._obtenerRoles();
          this.accion = 'ninguno';
        }
      });
  }

  ver(id: number) {

  }

  crear() {
    this._reiniciarForm();
    this.accion = 'crear';
    this._obtenerRoles();
  }

  get roles(): FormArray {
    return this.form.get('roles') as FormArray;
  }
}
