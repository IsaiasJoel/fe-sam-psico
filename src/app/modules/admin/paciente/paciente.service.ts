import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response.interface';
import { environment } from 'src/environments/environment.dev';
import { DTOPacienteCrearEditarRequest, DTOPacienteListar } from './paciente.models';
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
  // buscarPorId$(id: string): Observable<ApiResponse> {
  //   let currentUrl = `${this._url}/${id}`;
  //   return this._http.get<any>(currentUrl);
  // }

  ver$(id: number): Observable<DTOPacienteCrearEditarRequest> {
    let currentUrl = `${this._url}/${id}`;
    return this._http.get<DTOPacienteCrearEditarRequest>(currentUrl);
  }

  listarTodos$(filtroNombres?: string): Observable<DTOPacienteListar[]> {
    let urlActual: string = `${this._url}/`;

    let parametros = new HttpParams();
    if (filtroNombres) {
      parametros.set('nombres', filtroNombres);
    }

    return this._http.get<DTOPacienteListar[]>(urlActual, { params: parametros });
  }

  crear$(item: DTOPacienteCrearEditarRequest): Observable<DTOPacienteCrearEditarRequest> {
    const fechaNacimiento = moment(new Date(item.fecNacimiento)).format(FORMATO_FECHA_ESTANDAR);
    item.fecNacimiento = fechaNacimiento;
    let urlActual: string = `${this._url}/`;
    return this._http.post<DTOPacienteCrearEditarRequest>(urlActual, item);
  }

  editar$(item: DTOPacienteCrearEditarRequest): Observable<DTOPacienteCrearEditarRequest> {
    // const fechaNacimiento = moment(new Date(item.fecNacimiento)).format(FORMATO_FECHA_ESTANDAR);
    // item.fecNacimiento = fechaNacimiento;
    let urlActual: string = `${this._url}/`;
    return this._http.put<DTOPacienteCrearEditarRequest>(urlActual, item);
  }
}
