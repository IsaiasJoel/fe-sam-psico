import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { Pais } from '../models/shared.models';

@Injectable({
  providedIn: 'root'
})
export class PaisService {
  private _url: string = `${environment.HOST}/paises`;

  constructor(protected http: HttpClient) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  paises$(): Observable<Pais[]> {
    let currentUrl = `${this._url}/`;
    return this.http.get<Pais[]>(currentUrl);
  }
}
