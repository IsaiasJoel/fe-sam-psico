import { Component, ViewChild } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../admin/usuario/usuario.service';
import { MenuService } from '../../admin/menu/menu.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response.interface';
import { ToastrCustomService } from 'src/app/core/modals/toastr-custom.service';

@Component({
  selector: 'iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html'
})
export class IniciarSesionComponent {
  estaCargando: boolean = false;
  mensajeError: string;

  // @ViewChild('signInNgForm') public signInNgForm: NgForm;

  signInForm: UntypedFormGroup;

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _router: Router,
    private _authService: AuthService,
    private _usuarioService: UsuarioService,
    private _toastrCustomService: ToastrCustomService,
    private _menuService: MenuService
  ) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------
  ngOnInit(): void {
    this._crearFormulario();
    this._mostrarMensajeSesionExpirada();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------
  private _crearFormulario() {
    this.signInForm = this._formBuilder.group({
      usuario: ['lnevado@nicmaish.org', [Validators.required]],
      contrasenia: ['lnevado', Validators.required]
    });
  }

  private _mostrarMensajeSesionExpirada(): void {
    if (!this._authService.tokenVencido) {
      this._toastrCustomService.mostrar('Por favor ingrese nuevamente', 'Su sesión expiró', 'Warning');
    }
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  async procesarSolicitud(): Promise<void> {
    this.estaCargando = true;
    this.mensajeError = undefined;

    if (this.signInForm.invalid) {
      this.estaCargando = false;
      this.mensajeError = "Credenciales inválidas";
      return;
    }

    this.signInForm.disable();

    /** Devuelve el token que envía el servidor */
    try {
      //Obtener el token 
      const correo: string = await lastValueFrom(this._authService.iniciarSesion$(this.signInForm.value));

      //Buscar al usuario por su username
      const respuestaUsuario: ApiResponse = await lastValueFrom(this._usuarioService.buscarUsuarioPorCorreo$(correo));
      this._usuarioService.usuarioEnSesion = respuestaUsuario.data;

      // Guardar la lista de menues en el SesionStorage
      this._menuService.guardarListaMenuesDesdeListaRoles(respuestaUsuario.data.roles);

      this.estaCargando = false;
      this._router.navigate(['./dashboard']);
    } catch (error) {
      this.mensajeError = (error as HttpErrorResponse).error?.message?.ERROR;
      this.signInForm.enable();
      this.estaCargando = false;
    }
  }
}
