import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response.interface';
import { environment } from 'src/environments/environment.dev';
import { DTOServicioCrearEditarRequest } from './servicio.model';

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
  buscarPorId$(id: number): Observable<ApiResponse> {
    let currentUrl = `${this._url}/${id}`;
    return this._http.get<any>(currentUrl);
  }

  listar$(): Observable<ApiResponse> {
    let currentUrl = `${this._url}/`;
    return this._http.get<any>(currentUrl);
  }

  crear$(item: DTOServicioCrearEditarRequest): Observable<ApiResponse> {
    let currentUrl = `${this._url}/`;
    return this._http.post<any>(currentUrl, item);
  }

  editar$(item: DTOServicioCrearEditarRequest): Observable<ApiResponse> {
    let currentUrl = `${this._url}/${item.id}`;
    return this._http.put<any>(currentUrl, item);
  }

  habilitar$(idServicio: string, tipo: 'habilitar' | 'deshabilitar'): Observable<ApiResponse> {
    let currentUrl = `${this._url}/habilitar/${idServicio}/?tipo=${tipo}`;
    return this._http.put<any>(currentUrl, null);
  }
}
