import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, of, tap } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response.interface';
import { environment } from 'src/environments/environment.dev';
import { DTOUsuarioCrearActualizar, DTOUsuarioListar, DTOUsuarioSesion } from './usuario.models';
import { USUARIO } from 'src/app/shared/data/shared.data';
import * as moment from 'moment';
import { FORMATO_FECHA_ESTANDAR } from 'src/app/core/utils/constants.utils';

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
    return of(this.usuarioMemoria).pipe(
      tap((user) => {
        this._user.next(user);
      })
    );
  }

  get usuarioMemoria(): DTOUsuarioSesion {
    return JSON.parse(localStorage.getItem(USUARIO));
  }

  get usuarioNombresCompletos(): string {
    const usuario = this.usuarioMemoria;
    const nombresCompletos: string = `${usuario?.apPaterno} ${usuario?.apMaterno} ${usuario?.nombres}`;
    return nombresCompletos.trim() == '' ? usuario.username : nombresCompletos;
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

  listarTodos$(nombres?: string): Observable<DTOUsuarioListar[]> {
    let urlActual: string = `${this._url}/`;

    //Evaluar parámetros
    let parametros = new HttpParams();
    if (nombres) {
      parametros.set('nombres', nombres);
    }

    return this._http.get<DTOUsuarioListar[]>(urlActual, { params: parametros });
  }

  buscarUsuarioPorCodigo$(codigo: string): Observable<DTOUsuarioCrearActualizar> {
    let urlActual: string = `${this._url}/${codigo}`;
    return this._http.get<DTOUsuarioCrearActualizar>(urlActual);
  }

  ver$(id: number): Observable<DTOUsuarioCrearActualizar> {
    let urlActual: string = `${this._url}/${id}`;
    return this._http.get<DTOUsuarioCrearActualizar>(urlActual);
  }

  editar$(item: DTOUsuarioCrearActualizar): Observable<DTOUsuarioCrearActualizar> {
    if (!item.esPsicologo) {
      item.psicologo = null;
      item.esPsicologo = false;
    }

    if (item.habilitado == null) {
      item.habilitado = true;
    }

    let urlActual: string = `${this._url}/`;
    return this._http.put<DTOUsuarioCrearActualizar>(urlActual, item);
  }

  resetContrasenia$(codigoUsuario: string): Observable<ApiResponse> {
    let urlActual: string = `${this._url}/contrasenia`;
    return this._http.put<ApiResponse>(urlActual, { codigoUsuario });
  }

  crear$(item: DTOUsuarioCrearActualizar): Observable<ApiResponse> {
    if (!item.esPsicologo) {
      item.psicologo = null;
      item.esPsicologo = false;
    }

    if (item.habilitado == null) {
      item.habilitado = true;
    }

    item.fecNacimiento = moment(item.fecNacimiento).format(FORMATO_FECHA_ESTANDAR);
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
