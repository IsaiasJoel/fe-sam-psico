import { Injectable } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolMenuService {
  //======================================================================
  //Variables
  //======================================================================
  private _menues: Subject<string[]> = new Subject<string[]>();

  //======================================================================
  //Ciclo de vida
  //======================================================================
  constructor() { }

  //======================================================================
  //Accesores
  //======================================================================
  get menues$() {
    return this._menues.asObservable();
  }

  set menues({ codigo, codigoPadre }) {
    const seleccionado: boolean = this._menuEstaSeleccionado(codigo);
    if (!seleccionado) {
      this._agregarItemYPadres(codigo, codigoPadre);
    } else {
      this._quitarItemYPadres(codigo, codigoPadre);
    }
  }

  //======================================================================
  //Métodos privados
  //======================================================================
  /** Retorna un boolean sobre si el menú está o no seleccionado */
  private _menuEstaSeleccionado(menuCodigo: string): boolean {
    const indexEncontrado: Observable<number> = this._buscarIndexPorMenuCodigo(menuCodigo);
    return (indexEncontrado == -1);
  }

  private _buscarIndexPorMenuCodigo(menuCodigo: string): Observable<number> {
    return this.menues$.pipe(
      map(codigos => codigos.findIndex(x => x === menuCodigo) ?? -1)
    );
  }
}
