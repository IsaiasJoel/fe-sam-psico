import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.dev';
import { DTOMenuNavegacion, DTOMenuRolGuardarRequest } from './menu.model';
import { Observable, ReplaySubject } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response.interface';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private url: string = `${environment.HOST}/menues`;
  private _menues: ReplaySubject<DTOMenuNavegacion[]> = new ReplaySubject<DTOMenuNavegacion[]>(1);

  constructor(
    private _http: HttpClient
  ) { }

  //=====================================================================
  // Accesores
  //=====================================================================
  get menues$(): Observable<DTOMenuNavegacion[]> {
    return this._menues.asObservable();
  }

  set menues(menues: DTOMenuNavegacion[]) {
    this._menues.next(menues);
  }

  listar$(numeroPagina: number, tamanioPagina: number, codigo?: string, nombre?: string, estado?: string, tipo?: string, visible?: string): Observable<ApiResponse> {
    let urlActual: string = `${this.url}/page?numeroPagina=${numeroPagina}&tamanioPagina=${tamanioPagina}`;
    if (codigo) urlActual += `&codigo=${codigo}`;
    if (nombre) urlActual += `&nombre=${nombre}`;
    if (estado && estado !== 'seleccione') urlActual += `&estado=${estado}`;
    if (tipo && tipo !== 'seleccione') urlActual += `&tipo=${tipo}`;
    if (visible && visible !== 'seleccione') urlActual += `&visible=${visible}`;
    return this._http.get<ApiResponse>(urlActual);
  }

  listarMenuesDeSuperusuario$(): Observable<ApiResponse> {
    let urlActual: string = `${this.url}/superusuario`;
    return this._http.get<ApiResponse>(urlActual);
  }

  verPermisosDeMenuesPorIdRol$(idRol: string) {
    let urlActual: string = `${this.url}/${idRol}`;
    return this._http.get<ApiResponse>(urlActual);
  }

  guardar$(objeto: DTOMenuRolGuardarRequest): Observable<ApiResponse> {
    let urlActual: string = `${this.url}/`;
    return this._http.post<ApiResponse>(urlActual, objeto);
  }

  // crear$(item: DTOMenuVer): Observable<ApiResponse> {
  //   let urlActual: string = `${this.url}/crear`;
  //   return this._http.post<ApiResponse>(urlActual, item);
  // }

  //Busca un ID de menu en todos los menues, retorna un booleano 
  // menuTienePermiso(idMenu: string): boolean {
  //   const menuesEnMemoria: DTOMenuNavegacion[] = this.menues;

  //   function buscarMenu(menu: DTOMenuNavegacion): boolean {
  //     if (menu.id === idMenu) {
  //       return true;
  //     }
  //     return menu.hijos?.some(hijo => buscarMenu(hijo)) || false;
  //   }
  //   return menuesEnMemoria?.some(menu => buscarMenu(menu));
  // }

  //Busca un ID de menu en todos los menues, retorna un booleano 
  // menuTienePermisoPorRuta(ruta: string): boolean {
  //   const menuesEnMemoria: DTOMenuNavegacion[] = this.menues;

  //   function buscarMenu(menu: DTOMenuNavegacion): boolean {
  //     if (menu?.link?.includes(ruta)) {
  //       return true;
  //     }
  //     return menu.hijos?.some(hijo => buscarMenu(hijo)) || false;
  //   }
  //   return menuesEnMemoria?.some(menu => buscarMenu(menu));
  // }

  //===========================================
  // Validaciones en el servidor
  //===========================================
  validarOperacionGuardar$(objeto: DTOMenuRolGuardarRequest): Observable<ApiResponse> {
    let urlActual: string = `${this.url}/validar`;
    return this._http.post<ApiResponse>(urlActual, objeto);
  }

  // obtenerHijosPorCodigoPadre(codigoPadre: string): DTOMenuNavegacion[] {
  //   const menues: DTOMenuNavegacion[] = MENUES_MEMORIA.concat(MENUES_ADMINISTRADOS_MEMORIA);
  //   let padre: DTOMenuNavegacion = menues.find(x => x.codigo == codigoPadre);
  //   return padre ? padre.hijos : [];
  // }
}
