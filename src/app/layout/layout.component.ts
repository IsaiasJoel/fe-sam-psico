import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { DTOMenuNavegacion } from '../modules/admin/menu/menu.model';
import { AuthService } from '../core/services/auth.service';
import { MockNavigationMenues } from '../core/mock/navigation.mock';
import { PsicologoService } from '../modules/admin/psicologo/psicologo.service';
import { Observable, of } from 'rxjs';
import { UsuarioService } from '../modules/admin/usuario/usuario.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  isLoading: Observable<boolean> = of(false);
  @ViewChild('snav') nav: MatSidenav;
  navigation: DTOMenuNavegacion[] = MockNavigationMenues;
  // navigation: NavigationItem[] = JSON.parse(sessionStorage.getItem('MENUES'));
  fechaActual: Date = new Date();
  nombresUsuario: string;
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private _authService: AuthService,
    private _usuarioService: UsuarioService,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this._inicializarVariables();
  }

  private _inicializarVariables(): void {
    this.nombresUsuario = this._usuarioService.usuarioNombresCompletos;
  }

  cerrarSesion() {
    this._authService.cerrarSesion();
  }
}
