import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response.interface';
import { environment } from 'src/environments/environment.dev';

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
  listar$(): Observable<ApiResponse> {
    let currentUrl = `${this._url}/`;
    return this._http.get<any>(currentUrl);
  }
}
