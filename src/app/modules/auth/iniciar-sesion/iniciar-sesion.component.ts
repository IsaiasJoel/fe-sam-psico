import { Component } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuService } from '../../admin/menu/menu.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { lastValueFrom } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response.interface';
import { ToastrCustomService } from 'src/app/core/modals/toastr-custom.service';
import { UsuarioService } from '../../admin/usuario/usuario.service';

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
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Private methods
  // -----------------------------------------------------------------------------------------------------
  private _crearFormulario() {
    this.signInForm = this._formBuilder.group({
      usuario: [null, [Validators.required]],
      contrasenia: [null, Validators.required]
    });
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

    /** Devuelve el token que envía el servidor */
    //Obtener el token 
    const usuario: string = await lastValueFrom(this._authService.iniciarSesion$(this.signInForm.value));

    //Buscar al usuario por su username
    const respServidor: ApiResponse = await lastValueFrom(this._usuarioService.buscarUsuarioPorUsername$(usuario));
    this._usuarioService.usuarioActual = respServidor.data;

    // Guardar la lista de menues en el SesionStorage
    this._menuService.menues = respServidor.data?.menues;
    this._router.navigate(['./dashboard']);
  }
}
