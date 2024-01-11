import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response.interface';
import { environment } from 'src/environments/environment.dev';
import { USUARIO_SESION } from 'src/app/core/utils/constants.utils';
import { DTOUsuarioEnSesion } from './usuario.models';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private _url: string = `${environment.HOST}/usuarios`;

  constructor(
    protected _http: HttpClient
  ) { }

  get usuarioEnSesion(): DTOUsuarioEnSesion {
    return JSON.parse(sessionStorage.getItem(USUARIO_SESION));
  }

  set usuarioEnSesion(usuario: DTOUsuarioEnSesion) {
    sessionStorage.setItem(USUARIO_SESION, JSON.stringify(usuario));
  }

  get nombresCompletos(): string {
    return `${this.usuarioEnSesion.apPaterno} ${this.usuarioEnSesion.apMaterno} ${this.usuarioEnSesion.nombres}`
  }

  get nombresCortos(): string {
    return `${this.usuarioEnSesion.nombres} ${this.usuarioEnSesion.apPaterno}`
  }

  buscarUsuarioPorCorreo$(correo: string): Observable<ApiResponse> {
    let currentUrl = `${this._url}/?correo=${correo}`;
    return this._http.get<any>(currentUrl);

  }

  listarPaginacion$(numeroPagina: number, tamanioPagina: number, filtro?: string): Observable<ApiResponse> {
    let urlActual: string = `${this._url}/page?numeroPagina=${numeroPagina}&tamanioPagina=${tamanioPagina}`;
    if (filtro) urlActual += `&filtro=${filtro}`;
    return this._http.get<ApiResponse>(urlActual);
  }

  crear$(item: any): Observable<ApiResponse> {
    let urlActual: string = `${this._url}/`;
    return this._http.post<ApiResponse>(urlActual, item);
  }

  editar$(item: any): Observable<ApiResponse> {
    let urlActual: string = `${this._url}/`;
    return this._http.put<ApiResponse>(urlActual, item);
  }
}
