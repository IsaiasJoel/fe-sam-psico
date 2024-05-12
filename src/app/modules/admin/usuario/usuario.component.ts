import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { forkJoin, lastValueFrom } from 'rxjs';
import { UsuarioService } from './usuario.service';
import { SweetAlertService } from 'src/app/core/modals/sweet-alert.service';
import { DTOUsuarioListar } from './usuario.models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DTOSexoCombo, Pais } from 'src/app/shared/models/shared.models';
import { PaisService } from 'src/app/shared/services/pais.service';
import { SexoService } from 'src/app/shared/services/sexo.service';
import { RolService } from '../rol/rol.service';
import { DTORolMatchPorIdUsuario } from '../rol/rol.model';
import { UsuarioRolInteraccionService } from './usuario-rol-interaccion.service';

@Component({
  selector: 'usuario',
  templateUrl: './usuario.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsuarioComponent {
  //=====================================
  // Variables
  //=====================================
  accion: 'crear' | 'editar' | 'ninguno' = 'ninguno';
  filtroNombres: string;
  form: FormGroup;
  usuarios: DTOUsuarioListar[] = [];
  paises: Pais[] = [];
  sexos: DTOSexoCombo[] = [];
  rolesPorUsuario: DTORolMatchPorIdUsuario[] = [];

  //==========================================================================
  // Ciclo de vida
  //==========================================================================
  constructor(
    private _usuarioService: UsuarioService,
    private _sweetAlertService: SweetAlertService,
    private _changeDetectionRef: ChangeDetectorRef,
    private _formBuilder: FormBuilder,
    private _paisService: PaisService,
    private _sexoService: SexoService,
    private _rolService: RolService,
    private _usuarioRolInteraccionService: UsuarioRolInteraccionService
  ) { }

  ngOnInit(): void {
    this._crearFormulario();
    this._obtenerPaises();
    this._obtenerSexos();
    this._obtenerUsuarios();
    this._suscribirseALosRoles();
  }

  //==========================================================================
  // Métodos privados
  //==========================================================================
  private _suscribirseALosRoles() {
    this._usuarioRolInteraccionService.roles$
      .subscribe((data: number[]) => {
        this.form.patchValue({ roles: data });
        this._changeDetectionRef.markForCheck();
      });
  }

  private async _obtenerUsuarios() {
    const http$ = this._usuarioService.listarTodos$(this.filtroNombres);
    this.usuarios = await lastValueFrom(http$);
    this._changeDetectionRef.markForCheck();
  }

  private async _obtenerRolesPorUsuario(idUsuario?: number) {
    const http$ = this._rolService.listarPorUsuario$(idUsuario);
    this.rolesPorUsuario = await lastValueFrom(http$);
    this._changeDetectionRef.markForCheck();
  }

  private _crearFormulario() {
    this.form = this._formBuilder.group({
      // Usuario
      id: [null, [Validators.required]],
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
      esPsicologo: [false, [Validators.required]],
      habilitado: [false, [Validators.required]],
      roles: [[], []],
      psicologo: this._formBuilder.group({
        id: [null, []],
        universidad: [null, []],
        anioEgreso: [null, []],
        esColegiado: [null, []],
        numColegiatura: [null, []],
        especialidad: [null, []],
        resumenProfesional: [null, []]
      })
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

  private _reiniciarForm() {
    this.form.reset();
    this.form.patchValue({
      pais: this.paises.find(pais => pais.iso == 'PE'),
      sexo: this.sexos.find(x => x.codigo == 'SX09'),
    });
  }

  private async _crear() {
    const http$ = this._usuarioService.crear$(this.form.value);
    await lastValueFrom(http$);
  }

  private async _editar() {
    const http$ = this._usuarioService.editar$(this.form.value);
    await lastValueFrom(http$);
  }

  //==========================================================================
  // Métodos públicos
  //==========================================================================
  filtrar(event: KeyboardEvent) {
    if (event.key != 'Enter') return;
    this._obtenerUsuarios();
  }

  clickFiltrar() {
    this._obtenerUsuarios();
  }

  // async resetearContrasenia(codigoUsuario: string) {
  //   const ref = await this._sweetAlertService.preguntarSiNo('Esta accion reestablecerá la contraseña por defecto');
  //   if (!ref.isConfirmed) return;
  //   const respuestaServidor: ApiResponse = await lastValueFrom(this._usuarioService.resetContrasenia$(codigoUsuario));
  //   if (!respuestaServidor.successful) return;
  // }


  procesarSolicitud() {
    this._sweetAlertService.preguntarSiNo('¿Desea agregar un nuevo usuario?')
      .then(async respuesta => {
        if (respuesta.isConfirmed) {
          console.log(this.form.value);
          (this.accion == 'crear') ? await this._crear() : await this._editar();
          await this._obtenerUsuarios();
          this.accion = 'ninguno';
        }
      });
  }

  ver(id: number) {
    this.accion = 'editar';
    const httpUsuario$ = this._usuarioService.ver$(id);
    const httpRolesPorUsuario$ = this._rolService.listarPorUsuario$(id);

    forkJoin({
      usuario: httpUsuario$,
      rolesPorUsuario: httpRolesPorUsuario$
    }).subscribe(data => {
      this.form.patchValue(data.usuario);
      this.form.patchValue({
        sexo: this.sexos.find(x => x.codigo == data.usuario.sexo.codigo),
        pais: this.paises.find(x => x.id == data.usuario.pais.id)
      })
      this.rolesPorUsuario = data.rolesPorUsuario;
      this._changeDetectionRef.markForCheck();
    })
  }

  async crear() {
    this.accion = 'crear';
    this._reiniciarForm();
    this._obtenerRolesPorUsuario();
  }

  cancelar() {
    this.accion = 'ninguno';
    this._reiniciarForm();
    this._obtenerUsuarios();
  }

  agregarAListaParaEnviar(id: number) {
    this._usuarioRolInteraccionService.roles = id;
  }
}
