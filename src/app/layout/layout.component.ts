import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { DTOMenuNavegacion } from '../modules/admin/menu/menu.model';
// import { DTOUsuarioEnSesion } from '../modules/admin/usuario/usuario.model';
import { UsuarioService } from '../modules/admin/usuario/usuario.service';
import { AuthService } from '../core/services/auth.service';
import { MockNavigationMenues } from '../core/mock/navigation.mock';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls:['./layout.component.scss']
})
export class LayoutComponent {
  @ViewChild('snav') nav: MatSidenav;
  navigation: DTOMenuNavegacion[] = MockNavigationMenues;
  // navigation: NavigationItem[] = JSON.parse(sessionStorage.getItem('MENUES'));
  fechaActual: Date = new Date();
  nombresUsuario: string;
  mobileQuery: MediaQueryList;

  // usuarioLogeado: DTOUsuarioEnSesion = JSON.parse(sessionStorage.getItem('USUARIO'));
  // ingresaPorPrimeraVez: boolean = false;
  private _mobileQueryListener: () => void;

  constructor(
    private _authService: AuthService,
    private _usuarioService: UsuarioService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    // this._recibirParametroIngresaPorPrimeraVez();
  }

  ngOnInit(): void {
    this._inicializarVariables();
  }

  ngOnDestroy(): void {
    // this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  // private _recibirParametroIngresaPorPrimeraVez(): void {
  //   this._loginService.primeraVez$.subscribe((info: boolean) => {
  //     // this.ingresaPorPrimeraVez = info;
  //   });
  // }

  private _inicializarVariables(): void {
    this.nombresUsuario = this._usuarioService.nombresCortos;
  }

  cerrarSesion() {
    this._authService.cerrarSesion();
  }

  generarCadenaRoles(): string {
    // const roles = this.usuarioLogeado.roles;
    // let respuesta = roles.map(rol => rol.nombre).join(' | ');
    // respuesta = respuesta.trim();
    // if (respuesta.endsWith('|')) {
    //   respuesta = respuesta.substring(0, respuesta.length - 1);
    // }
    // return respuesta;
    return "ADMINISTRADOR";
  }

}
