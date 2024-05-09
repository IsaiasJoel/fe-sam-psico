import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.dev';
import { DTOSexoCombo } from '../models/shared.models';

@Injectable({
  providedIn: 'root'
})
export class SexoService {
  private _url: string = `${environment.HOST}/sexos`;

  constructor(protected http: HttpClient) { }

  sexos$(): Observable<DTOSexoCombo[]> {
    let currentUrl = `${this._url}/`;
    return this.http.get<DTOSexoCombo[]>(currentUrl);
  }
}
