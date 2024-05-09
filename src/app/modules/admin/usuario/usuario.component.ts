import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response.interface';
import { UsuarioService } from './usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { SweetAlertService } from 'src/app/core/modals/sweet-alert.service';
import { DTOUsuarioListar } from './usuario.models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  accion: 'crear' | 'editar' | 'ninguno' = 'crear';
  filtroNombres: string = '';
  form: FormGroup;
  usuarios: DTOUsuarioListar[] = [
    { id: 1, nombresCompletos: "Juan Pérez Domínguez", activo: true, tipo: "Administrador" },
    { id: 2, nombresCompletos: "María López Montalbán", activo: false, tipo: "Usuario Regular" },
    { id: 3, nombresCompletos: "Carlos García Piscoya", activo: true, tipo: "Usuario Regular" }
  ];
  roles: DTORolListar[] = [];
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
    this._obtenerRoles();
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
    this.roles = await lastValueFrom(http$);
    this._changeDetectionRef.markForCheck();
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

  async resetearContrasenia(codigoUsuario: string) {
    const ref = await this._sweetAlertService.preguntarSiNo('Esta accion reestablecerá la contraseña por defecto');
    if (!ref.isConfirmed) return;
    const respuestaServidor: ApiResponse = await lastValueFrom(this._usuarioService.resetContrasenia$(codigoUsuario));
    if (!respuestaServidor.successful) return;
  }

  abrirModalVerMenuesPorUsuario(pidUsuario: number, pNombresCompletos: string) {
    const ref = this._matDialog.open(null,
      {
        data: {
          codigoUsuario: pidUsuario,
          nombresUsuario: pNombresCompletos
        }
      });

    ref.afterClosed().subscribe(respuestaModal => {
      if (respuestaModal == 'OK') {
        // this._abrirSnackBar('Los roles fueron actualizados');
      }
    })
  }

  abrirModalEditarUsuario(pCodigoTrabajador: string) {
    const ref = this._matDialog.open(null,
      {
        data: {
          codigoTrabajador: pCodigoTrabajador
        }
      });

    ref.afterClosed().subscribe(respuestaModal => {
      if (respuestaModal == 'OK') {
        // this._abrirSnackBar('El usuario fue editado correctamente');
        this._listarUsuarios();
      }
    });
  }

  abrirModalCrearUsuario() {
    const ref = this._matDialog.open(null);

    ref.afterClosed().subscribe(respuestaModal => {
      if (respuestaModal == 'OK') {
        // this._abrirSnackBar('El usuario fue creado correctamente');
        this._listarUsuarios();
      }
    });
  }

  cancelar() {

  }

  procesarSolicitud() {

  }

  ver(id: number) {

  }

  crear() {

  }
}
