import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuService } from '../../admin/menu/menu.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { lastValueFrom } from 'rxjs';
import { ToastrCustomService } from 'src/app/core/modals/toastr-custom.service';
import { UsuarioService } from '../../admin/usuario/usuario.service';
import { DTOUsuarioSesion } from '../../admin/usuario/usuario.models';

@Component({
  selector: 'iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IniciarSesionComponent {
  // -----------------------------------------------------------------------------------------------------
  // @ Variables
  // -----------------------------------------------------------------------------------------------------
  mensajeError: string;
  signInForm: UntypedFormGroup;

  // -----------------------------------------------------------------------------------------------------
  // @ Ciclo de vida
  // -----------------------------------------------------------------------------------------------------
  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _router: Router,
    private _authService: AuthService,
    private _usuarioService: UsuarioService,
    private _toastrCustomService: ToastrCustomService,
    private _menuService: MenuService
  ) { }

  ngOnInit(): void {
    this._crearFormulario();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Métodos privados
  // -----------------------------------------------------------------------------------------------------
  private _crearFormulario() {
    this.signInForm = this._formBuilder.group({
      usuario: [null, [Validators.required]],
      contrasenia: [null, Validators.required]
    });
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Métodos públicos
  // -----------------------------------------------------------------------------------------------------
  async procesarSolicitud() {
    this.mensajeError = undefined;

    if (this.signInForm.invalid) {
      this.mensajeError = "Credenciales inválidas";
      return;
    }

    /** Devuelve el token que envía el servidor */
    //Obtener el token 
    const usuario: string = await lastValueFrom(this._authService.iniciarSesion$(this.signInForm.value));

    //Buscar al usuario por su username
    const usuarioEncontrado: DTOUsuarioSesion = await lastValueFrom(this._usuarioService.buscarUsuarioPorUsername$(usuario));
    this._usuarioService.usuarioActual = usuarioEncontrado;

    // Guardar la lista de menues en el SesionStorage
    this._menuService.menues = usuarioEncontrado?.menues;
    this._router.navigate(['./dashboard']);
  }
}