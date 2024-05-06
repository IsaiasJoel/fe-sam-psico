import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DTOBuscarUbigeo } from '../models/shared.models';
import { environment } from 'src/environments/environment.dev';
import { ApiResponse } from 'src/app/core/models/api-response.interface';
import { TEXTO_SELECCIONE } from '../data/shared.data';

@Injectable({
  providedIn: 'root'
})
export class UbigeoService {
  private _textoSeleccione: string = TEXTO_SELECCIONE;
  private _ubigeo: Subject<UbigeoSeleccionado> = new Subject<UbigeoSeleccionado>;
  private _ubigeoSeleccionado: UbigeoSeleccionado;
  private _url: string = `${environment.HOST}/ubigeos`;

  constructor(protected http: HttpClient) {
    this._inicializarObjeto();
    this.departamento = 'LAMBAYEQUE';
    this.provincia = 'CHICLAYO';
    this.distrito = 'CHICLAYO';
    this.departamentos$().subscribe();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------
  get ubigeo$() {
    return this._ubigeo.asObservable();
  }

  set departamento(departamento: string) {
    this.provincias$(departamento).subscribe();
    this._ubigeoSeleccionado.departamento.seleccionado = departamento;
    this._ubigeoSeleccionado.provincia.seleccionado = this._textoSeleccione;
    this._ubigeoSeleccionado.distrito.seleccionado = this._textoSeleccione;
    this._ubigeo.next(this._ubigeoSeleccionado);
  }

  set provincia(provincia: string) {
    this.distritos$(provincia).subscribe();
    this._ubigeoSeleccionado.provincia.seleccionado = provincia;
    this._ubigeoSeleccionado.distrito.seleccionado = this._textoSeleccione;
    this._ubigeo.next(this._ubigeoSeleccionado);
  }

  set distrito(distrito: string) {
    this._ubigeoSeleccionado.distrito.seleccionado = distrito;
    this._ubigeo.next(this._ubigeoSeleccionado);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  departamentos$(): Observable<ApiResponse> {
    let currentUrl = `${this._url}/departamentos`;
    return this.http.get<ApiResponse>(currentUrl).pipe(
      tap((respServidor: ApiResponse) => {
        this._ubigeoSeleccionado.departamento.departamentos = respServidor.data;
        this._ubigeo.next(this._ubigeoSeleccionado);
      })
    );
  }

  provincias$(departamento: string): Observable<any> {
    let currentUrl = `${this._url}/departamentos/${departamento}/provincias`;
    return this.http.get<any>(currentUrl).pipe(
      tap((respServidor: ApiResponse) => {
        this._ubigeoSeleccionado.provincia.provinciasPorDepartamento = respServidor.data;
        this._ubigeo.next(this._ubigeoSeleccionado);
      })
    );
  }

  distritos$(provincia: string): Observable<any> {
    let currentUrl = `${this._url}/provincias/${provincia}/distritos`;
    return this.http.get<any>(currentUrl).pipe(
      tap((respServidor: ApiResponse) => {
        this._ubigeoSeleccionado.distrito.distritosPorProvincia = respServidor.data;
        this._ubigeo.next(this._ubigeoSeleccionado);
      })
    );
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Métodos privados
  // -----------------------------------------------------------------------------------------------------
  private _inicializarObjeto() {
    this._ubigeoSeleccionado = {
      departamento: {
        seleccionado: 'SELECCIONE',
        departamentos: []
      },
      provincia: {
        seleccionado: 'SELECCIONE',
        provinciasPorDepartamento: []
      },
      distrito: {
        seleccionado: 'SELECCIONE',
        distritosPorProvincia: []
      }
    }
  }

  buscarUbigeoPorDepartamentoProvinciaDistrito$(departamento: string, provincia: string, distrito: string): Observable<DTOBuscarUbigeo> {
    let currentUrl =
      `${this._url}/buscarCodigoUbigeoPorDepartamentoProvinciaDistrito?departamento=${departamento}&provincia=${provincia}&distrito=${distrito}`;
    return this.http.get<any>(currentUrl);
  }
}

export interface UbigeoSeleccionado {
  departamento?: {
    seleccionado?: string;
    departamentos?: string[];
  },
  provincia?: {
    seleccionado?: string;
    provinciasPorDepartamento?: string[];
  },
  distrito?: {
    seleccionado?: string;
    distritosPorProvincia?: string[];
  }
}