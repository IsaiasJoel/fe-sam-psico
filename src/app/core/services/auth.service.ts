import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { TokenResponse } from '../models/token-response.interface';
import { AuthUtils } from '../auth/auth.utils';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _url: string = `${environment.HOST}/login`
  private _authenticated: boolean = false;

  constructor(
    private _httpClient: HttpClient,
    private _router: Router
  ) {
    this._authenticated = !this.accessToken;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accesores
  // -----------------------------------------------------------------------------------------------------

  /** * Access token */
  set accessToken(token: string) {
    sessionStorage.setItem(environment.TOKEN_NAME, token);
  }

  get accessToken(): string {
    return sessionStorage.getItem(environment.TOKEN_NAME);
  }

  /**Authenticated */
  get authenticated() {
    return this._authenticated;
  }

  set authenticated(auth: boolean) {
    this._authenticated = auth;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Métodos públicos
  // -----------------------------------------------------------------------------------------------------

  iniciarSesion$(credentials: { usuario: string; contrasenia: string }): Observable<string> {
    const rutaActual: string = `${this._url}/`;
    const body = {
      username: credentials.usuario,
      password: credentials.contrasenia
    }

    return this._httpClient.post<TokenResponse>(rutaActual, body)
      .pipe(
        switchMap((response: TokenResponse) => {
          // Store the access token in the local storage
          this.accessToken = response.jwtToken;

          // Set the authenticated flag to true
          this._authenticated = true;

          //del token obtener el correo del psicologo
          const helper = new JwtHelperService();
          const decodedToken = helper.decodeToken(this.accessToken);

          //guardar el correo del psicologo
          let usuario: string = decodedToken.sub;

          // Return a new observable with the response
          return of(usuario);
        })
      );
  }

  cerrarSesion(): void {
    // const urlActual: string = `${environment.HOST}/tokens/anular/${this.accessToken}`;
    // if (this.accessToken) {
    //   this._httpClient.get(urlActual)
    //     .subscribe(() => {
    //       sessionStorage.clear()
    //       this._authenticated = false;
    //     });
    // } else {
    //   sessionStorage.clear();
    //   this._authenticated = false;
    // }
    sessionStorage.clear();
    this._authenticated = false;
    this._router.navigate(['./iniciar-sesion']);
  }

  get tokenVencido(): boolean {
    return AuthUtils.isTokenExpired(this.accessToken) && this._authenticated;
  }

  /** Check the authentication status*/
  check(): Observable<boolean> {
    // Check if the user is logged in
    if (this._authenticated) {
      return of(true);
    }

    // Check the access token availability
    if (!this.accessToken) {
      return of(false);
    }

    // Check the access token expire date
    if (AuthUtils.isTokenExpired(this.accessToken)) {
      return of(false);
    }

    // If the access token exists and it didn't expire, sign in using it
    // TODO: REVISAR return this.signInUsingToken();
    return of(true);
  }

}
