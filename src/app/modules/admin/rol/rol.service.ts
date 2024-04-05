import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response.interface';
import { environment } from 'src/environments/environment.dev';
import { DTORolSimple, DTOUsuarioRolGuardarRequest } from './rol.model';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  url: string = `${environment.HOST}/roles`;

  constructor(
    private _http: HttpClient
  ) { }

  listar$(numeroPagina: number, tamanioPagina: number, nombre?: string): Observable<ApiResponse> {
    let urlActual: string = `${this.url}/page?numeroPagina=${numeroPagina}&tamanioPagina=${tamanioPagina}`;
    if (nombre) urlActual += `&nombre=${nombre}`;
    return this._http.get<ApiResponse>(urlActual);
  }

  buscarRolPorCodigo$(codigo: string): Observable<ApiResponse> {
    let urlActual: string = `${this.url}/${codigo}`;
    return this._http.get<ApiResponse>(urlActual);
  }

  verRolesPorCodigoUsuario$(codigoUsuario: string) {
    let urlActual: string = `${this.url}/match/${codigoUsuario}`;
    return this._http.get<ApiResponse>(urlActual);
  }

  editar$(item: DTORolSimple): Observable<ApiResponse> {
    let urlActual: string = `${this.url}/validar`;
    return this._http.put<ApiResponse>(urlActual, item);
  }

  crear$(item: DTORolSimple): Observable<ApiResponse> {
    let urlActual: string = `${this.url}/`;
    return this._http.post<ApiResponse>(urlActual, item);
  }

  guardarRolesPorUsuario$(listaCodigosRoles: string[], codigoUsuario: string): Observable<ApiResponse> {
    let urlActual: string = `${this.url}/rolesPorUsuario`;
    const item: DTOUsuarioRolGuardarRequest = { idRoles: listaCodigosRoles, idUsuario: codigoUsuario };
    return this._http.post<ApiResponse>(urlActual, item);
  }

  //===========================================
  // Validaciones en el servidor
  //===========================================
  // validarGuardarRolesPorUsuario$(listaCodigosRoles: string[], codigoUsuario: string): Observable<ApiResponse> {
  //   let urlActual: string = `${this.url}/rolesPorUsuario/validar`;
  //   const item: DTOUsuarioRolGuardarRequest = { rolesCodigos: listaCodigosRoles, usuarioCodigo: codigoUsuario };
  //   return this._http.post<ApiResponse>(urlActual, item);
  // }

  // validarOperacionCrear$(item: DTORolSimple): Observable<ApiResponse> {
  //   let urlActual: string = `${this.url}/validar`;
  //   return this._http.post<ApiResponse>(urlActual, item);
  // }

  // validarOperacionEditar$(item: DTORolSimple): Observable<ApiResponse> {
  //   let urlActual: string = `${this.url}/validar`;
  //   return this._http.put<ApiResponse>(urlActual, item);
  // }
}
