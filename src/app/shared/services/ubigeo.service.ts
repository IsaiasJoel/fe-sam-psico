import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DTOBuscarUbigeo, Ubigeo } from '../models/shared.models';
import { environment } from 'src/environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class UbigeoService {

  private _ubigeo = new Subject<Ubigeo[]>();
  private _url: string = `${environment.HOST}/ubigeos`;

  constructor(protected http: HttpClient) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------
  get ubigeo$() {
    return this.ubigeo.asObservable();
  }

  set ubigeo(object: any) {
    this._ubigeo.next(object);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  listarUbigeos$(): Observable<any> {
    let currentUrl = `${this._url}/listarUbigeos`;
    return this.http.get<any>(currentUrl);
  }

  listarDepartamentos$(): Observable<any> {
    let currentUrl = `${this._url}/listarDepartamentos`;
    return this.http.get<any>(currentUrl);
  }

  listarProvinciaPorDepartamento$(departamento: string): Observable<any> {
    let currentUrl = `${this._url}/listarProvinciaPorDepartamento?departamento=${departamento}`;
    return this.http.get<any>(currentUrl);
  }

  listarDistritoPorProvincia$(provincia: string): Observable<any> {
    let currentUrl = `${this._url}/listarDistritoPorProvincia?provincia=${provincia}`;
    return this.http.get<any>(currentUrl);
  }

  buscarUbigeoPorDepartamentoProvinciaDistrito$(departamento: string, provincia: string, distrito: string): Observable<DTOBuscarUbigeo> {
    let currentUrl =
      `${this._url}/buscarCodigoUbigeoPorDepartamentoProvinciaDistrito?departamento=${departamento}&provincia=${provincia}&distrito=${distrito}`;
    return this.http.get<any>(currentUrl);
  }
}