import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response.interface';
import { environment } from 'src/environments/environment.dev';
import { DTOAmbienteCombo, DTOAmbienteCrearEditarRequest, DTOAmbienteListar } from './ambiente.model';

@Injectable({
  providedIn: 'root'
})
export class AmbienteService {
  //=====================================================================
  // Variables
  //=====================================================================
  private _url: string = `${environment.HOST}/ambientes`;

  //=====================================================================
  // Ciclo de vida
  //=====================================================================
  constructor(
    protected _http: HttpClient
  ) { }

  //=====================================================================
  // Métodos HTTP
  //=====================================================================
  listarTodos$(): Observable<DTOAmbienteListar[]> {
    let currentUrl = `${this._url}/`;
    return this._http.get<DTOAmbienteListar[]>(currentUrl);
  }

  listarCombo$(): Observable<DTOAmbienteCombo[]> {
    let currentUrl = `${this._url}/combo`;
    return this._http.get<any>(currentUrl);
  }

  agregar$(item: DTOAmbienteCrearEditarRequest): Observable<ApiResponse> {
    let currentUrl = `${this._url}/`;
    return this._http.post<any>(currentUrl, { item });
  }

  verParaEditar$(id: number): Observable<ApiResponse> {
    let currentUrl = `${this._url}/${id}`;
    return this._http.get<any>(currentUrl);
  }

  editar$(item: DTOAmbienteCrearEditarRequest): Observable<ApiResponse> {
    let currentUrl = `${this._url}/`;
    return this._http.put<any>(currentUrl, { item });
  }
}
