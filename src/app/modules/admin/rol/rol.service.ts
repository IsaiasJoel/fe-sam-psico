import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { DTORolListar, DTORolMatchPorIdUsuario, DTORolRequestCrearEditar } from './rol.model';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  url: string = `${environment.HOST}/roles`;

  constructor(
    private _http: HttpClient
  ) { }

  listar$(nombre?: string): Observable<DTORolListar[]> {
    let urlActual: string = `${this.url}/`;

    //Evaluar parámetros
    let parametros = new HttpParams();
    if (nombre) {
      parametros.set('nombre', nombre);
    }

    return this._http.get<DTORolListar[]>(urlActual, { params: parametros });
  }

  listarPorUsuario$(idUsuario?: number): Observable<DTORolMatchPorIdUsuario[]> {
    let urlActual: string = `${this.url}/usuarios/${idUsuario ?? 0}`;
    return this._http.get<DTORolMatchPorIdUsuario[]>(urlActual);
  }

  ver$(id: number): Observable<DTORolRequestCrearEditar> {
    let urlActual: string = `${this.url}/${id}`;
    return this._http.get<DTORolRequestCrearEditar>(urlActual);
  }

  // verRolesPorCodigoUsuario$(codigoUsuario: string) {
  //   let urlActual: string = `${this.url}/match/${codigoUsuario}`;
  //   return this._http.get<ApiResponse>(urlActual);
  // }

  editar$(item: DTORolRequestCrearEditar): Observable<any> {
    let urlActual: string = `${this.url}/`;
    return this._http.put<any>(urlActual, item);
  }

  crear$(item: DTORolRequestCrearEditar): Observable<any> {
    let urlActual: string = `${this.url}/`;
    return this._http.post<any>(urlActual, item);
  }

  // guardarRolesPorUsuario$(listaCodigosRoles: string[], codigoUsuario: string): Observable<ApiResponse> {
  //   let urlActual: string = `${this.url}/rolesPorUsuario`;
  //   const item: DTOUsuarioRolGuardarRequest = { idRoles: listaCodigosRoles, idUsuario: codigoUsuario };
  //   return this._http.post<ApiResponse>(urlActual, item);
  // }

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
