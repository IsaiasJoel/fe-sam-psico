import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response.interface';
import { environment } from 'src/environments/environment.dev';
import { DTOServicioCombo, DTOServicioCrearEditarRequest, DTOServicioListar } from './servicio.model';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
  //=====================================================================
  // Variables
  //=====================================================================
  private _url: string = `${environment.HOST}/servicios`;

  //=====================================================================
  // Ciclo de vida
  //=====================================================================
  constructor(
    protected _http: HttpClient
  ) { }

  //=====================================================================
  // Métodos HTTP
  //=====================================================================
  listarTodos$(): Observable<DTOServicioListar[]> {
    let currentUrl = `${this._url}/`;
    return this._http.get<DTOServicioListar[]>(currentUrl);
  }

  listarCombo$(): Observable<DTOServicioCombo[]> {
    let currentUrl = `${this._url}/combo`;
    return this._http.get<any>(currentUrl);
  }

  agregar$(item: any): Observable<ApiResponse> {
    let currentUrl = `${this._url}/`;
    return this._http.post<any>(currentUrl, { item });
  }

  verParaEditar$(id: number): Observable<ApiResponse> {
    let currentUrl = `${this._url}/${id}`;
    return this._http.get<any>(currentUrl);
  }

  editar$(item: any): Observable<ApiResponse> {
    let currentUrl = `${this._url}/`;
    return this._http.put<any>(currentUrl, { item });
  }
}
