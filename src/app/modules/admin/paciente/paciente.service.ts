import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response.interface';
import { environment } from 'src/environments/environment.dev';

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
  listarPaginacion$(numeroPagina: number, tamanioPagina: number, filtroDni?: string, filtroNombres?: string): Observable<ApiResponse> {
    let urlActual: string = `${this._url}/page?numeroPagina=${numeroPagina}&tamanioPagina=${tamanioPagina}`;
    if (filtroDni) urlActual += `&filtroDni=${filtroDni}`;
    if (filtroNombres) urlActual += `&filtroNombres=${filtroNombres}`;
    return this._http.get<ApiResponse>(urlActual);
  }

  crear$(item: any): Observable<ApiResponse> {
    //TODO: revisar esta logica

    // let formulario: any = item;
    // const fechaNacimiento = moment(new Date(formulario.fechaNacimiento)).format(FORMATO_FECHA_ESTANDAR);
    // formulario.fechaNacimiento = fechaNacimiento;

    let urlActual: string = `${this._url}/`;
    return this._http.post<ApiResponse>(urlActual, item);
  }

  editar$(item: any): Observable<ApiResponse> {
    //TODO: revisar esta logica
    // let formulario: any = item;
    // const fechaNacimiento = moment(new Date(formulario.fechaNacimiento)).format(FORMATO_FECHA_ESTANDAR);
    // formulario.fechaNacimiento = fechaNacimiento;

    let urlActual: string = `${this._url}/${item.id}`;
    return this._http.put<ApiResponse>(urlActual, item);
  }
}
