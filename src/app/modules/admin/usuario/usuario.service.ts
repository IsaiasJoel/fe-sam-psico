import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, of, tap } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response.interface';
import { environment } from 'src/environments/environment.dev';
import { DTOUsuarioCrearActualizar, DTOUsuarioSesion } from './usuario.models';
import { USUARIO } from 'src/app/shared/data/shared.data';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  // -----------------------------------------------------------------------------------------------------
  // @ variables
  // -----------------------------------------------------------------------------------------------------
  private _url: string = `${environment.HOST}/usuarios`;
  // https://puntotech.github.io/rxjs-docu/concepts/subjects
  private _user: ReplaySubject<DTOUsuarioSesion> = new ReplaySubject<DTOUsuarioSesion>(1);

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  get usuarioActual$(): Observable<DTOUsuarioSesion> {
    return this._user.asObservable();
  }

  set usuarioActual(usuario: DTOUsuarioSesion) {
    localStorage.setItem(USUARIO, JSON.stringify(usuario));
    this._user.next(usuario);
  }

  /**
  * Get the current logged in user data
  */
  get(): Observable<DTOUsuarioSesion> {
    // acá obtener del session storage
    return of(JSON.parse(localStorage.getItem(USUARIO))).pipe(
      tap((user) => {
        this._user.next(user);
      })
    );
  }

  get usuarioNombresCompletos(): string {
    let usuario: DTOUsuarioSesion = {} as DTOUsuarioSesion;
    this.usuarioActual$.subscribe(x => usuario = x);
    return `${usuario?.apellidoPaterno} ${usuario?.apellidoMaterno} ${usuario?.nombres}`;
  }

  constructor(
    protected _http: HttpClient
  ) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Http methods
  // -----------------------------------------------------------------------------------------------------
  buscarUsuarioPorUsername$(username: string) {
    let currentUrl = `${this._url}/usernames/${username}`;
    return this._http.get<any>(currentUrl);
  }

  buscarUsuarioPorDni$(dni: string) {
    let currentUrl = `${this._url}/buscar?dni=${dni}`;
    return this._http.get<any>(currentUrl);
  }

  listarUsuariosPaginacion$(numeroPagina: number, tamanioPagina: number, dni?: string, nombre?: string, username?: string, estado?: string, esSuperUsuario?: string): Observable<ApiResponse> {
    let urlActual: string = `${this._url}/page?numeroPagina=${numeroPagina}&tamanioPagina=${tamanioPagina}`;
    if (dni) urlActual += `&dni=${dni}`;
    if (nombre) urlActual += `&nombres=${nombre}`;
    if (username) urlActual += `&username=${username}`;
    if (estado && estado !== 'X') urlActual += `&estado=${estado}`;
    if (esSuperUsuario && esSuperUsuario !== 'X') urlActual += `&esSuperUsuario=${esSuperUsuario}`;
    return this._http.get<ApiResponse>(urlActual);
  }

  buscarUsuarioPorCodigo$(codigo: string): Observable<ApiResponse> {
    let urlActual: string = `${this._url}/${codigo}`;
    return this._http.get<ApiResponse>(urlActual);
  }

  buscarUsuarioPorCodigoParaEditar$(codigo: string): Observable<ApiResponse> {
    let urlActual: string = `${this._url}/editar/${codigo}`;
    return this._http.get<ApiResponse>(urlActual);
  }

  editar$(item: DTOUsuarioCrearActualizar): Observable<ApiResponse> {
    let urlActual: string = `${this._url}/`;
    return this._http.put<ApiResponse>(urlActual, item);
  }

  resetContrasenia$(codigoUsuario: string): Observable<ApiResponse> {
    let urlActual: string = `${this._url}/contrasenia`;
    return this._http.put<ApiResponse>(urlActual, { codigoUsuario });
  }

  crear$(item: DTOUsuarioCrearActualizar): Observable<ApiResponse> {
    let urlActual: string = `${this._url}/`;
    return this._http.post<ApiResponse>(urlActual, item);
  }

  cambiarContrasenia$(contraseniaActual, contraseniaNueva): Observable<ApiResponse> {
    let urlActual: string = `${this._url}/cambiar-contrasenia`;

    //TODO: algoritmo de encriptación o hasheo 
    const hashContraseniaActual = contraseniaActual;
    const hashContraseniaNueva = contraseniaNueva;
    const codigoUsuario: number = this.usuarioActual.id;

    const parametros: any = {
      codigoUsuario: codigoUsuario,
      contraseniaActual: hashContraseniaActual,
      contraseniaNueva: hashContraseniaNueva
    }

    return this._http.put<ApiResponse>(urlActual, parametros);
  }

  comprobarSiIngresaPorPrimeraVez$(codigoUsuario: string): Observable<ApiResponse> {
    const urlActual: string = `${this._url}/primera-vez?codigo=${codigoUsuario}`;
    return this._http.get<ApiResponse>(urlActual);
  }

  //===========================================
  // Utilitarios
  //===========================================
}
