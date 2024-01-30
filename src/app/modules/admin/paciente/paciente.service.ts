import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response.interface';
import { environment } from 'src/environments/environment.dev';
import { DTOPacienteCrearEditarRequest } from './paciente.models';
import * as moment from 'moment';
import { FORMATO_FECHA_ESTANDAR } from 'src/app/core/utils/constants.utils';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {
  //=====================================================================
  // Variables
  //=====================================================================
  private _url: string = `${environment.HOST}/pacientes`;

  //=====================================================================
  // Ciclo de vida
  //=====================================================================
  constructor(
    protected _http: HttpClient
  ) { }

  //=====================================================================
  // Accesores
  //=====================================================================

  //=====================================================================
  // Métodos HTTP
  //=====================================================================
  buscarPorId$(id: string): Observable<ApiResponse> {
    let currentUrl = `${this._url}/${id}`;
    return this._http.get<any>(currentUrl);
  }

  listarPaginacion$(numeroPagina: number, tamanioPagina: number, filtroDni?: string, filtroNombres?: string, filtroNacionalidad?: string, filtroEstado?: string | boolean): Observable<ApiResponse> {
    let urlActual: string = `${this._url}/page?numeroPagina=${numeroPagina}&tamanioPagina=${tamanioPagina}`;
    if (filtroDni) urlActual += `&filtroDni=${filtroDni}`;
    if (filtroNombres) urlActual += `&filtroNombres=${filtroNombres}`;
    if (filtroNacionalidad) urlActual += `&filtroNacionalidad=${filtroNacionalidad}`;
    if (filtroEstado) urlActual += `&filtroEstado=${filtroEstado}`;
    return this._http.get<ApiResponse>(urlActual);
  }

  crear$(personalForm: any, socioeconomicoForm: any, familiarForm: any): Observable<ApiResponse> {
    let item: DTOPacienteCrearEditarRequest = Object.assign(personalForm, socioeconomicoForm, familiarForm);
    item.serviciosBasicos = item.serviciosBasicos.toString();
    const fechaNacimiento = moment(new Date(item.fechaNacimiento)).format(FORMATO_FECHA_ESTANDAR);
    item.fechaNacimiento = fechaNacimiento;
    let urlActual: string = `${this._url}/`;
    return this._http.post<ApiResponse>(urlActual, item);
  }

  editar$(personalForm: any, socioeconomicoForm: any, familiarForm: any): Observable<ApiResponse> {
    const item: DTOPacienteCrearEditarRequest = Object.assign(personalForm, socioeconomicoForm, familiarForm);
    const fechaNacimiento = moment(new Date(item.fechaNacimiento)).format(FORMATO_FECHA_ESTANDAR);
    item.fechaNacimiento = fechaNacimiento;
    let urlActual: string = `${this._url}/${item.id}`;
    return this._http.put<ApiResponse>(urlActual, item);
  }
}
