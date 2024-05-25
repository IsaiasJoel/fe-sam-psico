import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response.interface';
import { environment } from 'src/environments/environment.dev';
import { DTOPsicologoCasoAsignado } from './psicologo.models';

@Injectable({
  providedIn: 'root'
})
export class PsicologoService {
  //=====================================================================
  // Variables
  //=====================================================================
  private _url: string = `${environment.HOST}/psicologos`;

  //=====================================================================
  // Ciclo de vida
  //=====================================================================
  constructor(
    protected _http: HttpClient
  ) { }

  //=====================================================================
  // Accesores
  //=====================================================================
  // get usuarioEnSesion(): DTOPsicologoEnSesion {
  //   return JSON.parse(sessionStorage.getItem(USUARIO_SESION));
  // }

  // set usuarioEnSesion(usuario: DTOPsicologoEnSesion) {
  //   sessionStorage.setItem(USUARIO_SESION, JSON.stringify(usuario));
  // }

  // get nombresCompletos(): string {
  //   return `${this.usuarioEnSesion.apPaterno} ${this.usuarioEnSesion.apMaterno} ${this.usuarioEnSesion.nombres}`
  // }

  // get nombresCortos(): string {
  //   return `${this.usuarioEnSesion.nombres} ${this.usuarioEnSesion.apPaterno}`
  // }

  //=====================================================================
  // Métodos HTTP
  //=====================================================================
  listarCasosAsignadosPorPsicologo$(id: number): Observable<DTOPsicologoCasoAsignado> {
    let currentUrl = `${this._url}/${id}/casos-asignados`;
    return this._http.get<any>(currentUrl);
  }

  // buscarPsicologoPorId$(id: number): Observable<ApiResponse> {
  //   let currentUrl = `${this._url}/${id}`;
  //   return this._http.get<any>(currentUrl);
  // }

  // habilitar$(idPsicologo: string, tipo: 'habilitar' | 'deshabilitar'): Observable<ApiResponse> {
  //   let currentUrl = `${this._url}/habilitar/${idPsicologo}/?tipo=${tipo}`;
  //   return this._http.put<any>(currentUrl, null);
  // }

  // listarPaginacion$(numeroPagina: number, tamanioPagina: number, filtroDni?: string, filtroNombres?: string, filtroEstado?: string | boolean): Observable<ApiResponse> {
  //   let urlActual: string = `${this._url}/page?numeroPagina=${numeroPagina}&tamanioPagina=${tamanioPagina}`;
  //   if (filtroDni) urlActual += `&filtroDni=${filtroDni}`;
  //   if (filtroNombres) urlActual += `&filtroNombres=${filtroNombres}`;
  //   if (filtroEstado != 'Todos') urlActual += `&filtroEstado=${filtroEstado}`;
  //   return this._http.get<ApiResponse>(urlActual);
  // }

  // crear$(item: any): Observable<ApiResponse> {
  //   let formulario= null;
  //   // const fechaNacimiento = moment(new Date(formulario.fechaNacimiento)).format(FORMATO_FECHA_ESTANDAR);
  //   // formulario.fechaNacimiento = fechaNacimiento;

  //   let urlActual: string = `${this._url}/`;
  //   return this._http.post<ApiResponse>(urlActual, formulario);
  // }

  // editar$(item: any): Observable<ApiResponse> {
  //   let formulario = null;
  //   // const fechaNacimiento = moment(new Date(formulario.fechaNacimiento)).format(FORMATO_FECHA_ESTANDAR);
  //   // formulario.fechaNacimiento = fechaNacimiento;

  //   let urlActual: string = `${this._url}/${formulario.id}`;
  //   return this._http.put<ApiResponse>(urlActual, formulario);
  // }
}
