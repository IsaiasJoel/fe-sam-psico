import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from '../../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MenuService } from 'src/app/modules/admin/menu/menu.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard {
    constructor(
        private _loginService: AuthService,
        private _menuService: MenuService,
        private _router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // // (1) Verificar si está logeado
        // if (!this._loginService.authenticated) {
        //     // this._loginService.cerrarSesion();
        //     this._router.navigate(['./iniciar-sesion']);
        //     return false;
        // }

        // // (2) Verificar si el token no ha expirado
        // const helper = new JwtHelperService();
        // let token = sessionStorage.getItem(environment.TOKEN_NAME);

        // if (!helper.isTokenExpired(token)) {
        //     if (!this._tienePermiso(state)) {
        //         this._router.navigate(['./not-403']);
        //         return false;
        //     }
        //     return true;
        // }

        // if (helper.isTokenExpired(token)) {
        //     this._router.navigate(['./not-403']);
        //     // this._loginService.cerrarSesion();
        //     return false;
        // }
        // return false;
        return true;
    }

    //3) VERIFICAR SI TIENES EL ROL NECESARIO PARA ACCEDER A ESA PAGINA
    private _tienePermiso(state: RouterStateSnapshot): boolean {
        // const PREFIJO: string = '/pages/';
        // const rutaFinal: string = state.url.substring(PREFIJO.length, state.url.length);
        // return this._menuService.menuTienePermisoPorRuta(rutaFinal);
        return true;
    }
}