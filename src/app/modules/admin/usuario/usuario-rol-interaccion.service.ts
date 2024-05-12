import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DTORolMatchPorIdUsuario } from '../rol/rol.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioRolInteraccionService {
  //======================================================================
  // Variables
  //======================================================================
  private _roles: Subject<number[]> = new Subject<number[]>();
  private _listaParaEnviar: number[] = [];
  listaDesdeServidor: DTORolMatchPorIdUsuario[] = [];

  //======================================================================
  // Ciclo de vida
  //======================================================================
  constructor() {
    this._agregarItemsSeleccionados(this.listaDesdeServidor);
  }

  //======================================================================
  // Accesores
  //======================================================================
  get roles$() {
    return this._roles.asObservable();
  }

  set roles(idRol: number) {
    const seleccionado: boolean = this._rolEstaSeleccionado(idRol);
    if (!seleccionado) {
      this._agregarItem(idRol);
    } else {
      this._quitarItem(idRol);
    }
  }

  //======================================================================
  //Métodos privados
  //======================================================================
  /**Se llama cuando la respuesta del servidor ya está lista, aquí se agregan solamente los items
  * que ya están seleccionados
  */
  private _agregarItemsSeleccionados(listaServidor: DTORolMatchPorIdUsuario[]) {
    this._listaParaEnviar = listaServidor
      .filter(x => x.match)
      .map(x => x.id);
  }

  private _rolEstaSeleccionado(id: number): boolean {
    return this._listaParaEnviar.includes(id);
  }

  private _agregarItem(id: number): void {
    //verifica que no esté en la lista antes de agregar
    if (!this._listaParaEnviar.includes(id)) {
      this._listaParaEnviar.push(id);
      this._actualizarValor();
    }
  }

  private _quitarItem(id: number): void {
    const index: number = this._listaParaEnviar.findIndex(x => x == id);
    this._listaParaEnviar.splice(index, 1);
    this._actualizarValor();
  }

  private _actualizarValor() {
    this._roles.next(this._listaParaEnviar);
  }
}
