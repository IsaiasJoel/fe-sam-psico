import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DTOMenuMatchPorCodigoRol } from '../menu/menu.model';

@Injectable({
  providedIn: 'root'
})
export class RolMenuService {
  //======================================================================
  //Variables
  //======================================================================
  private _menues: Subject<string[]> = new Subject<string[]>();
  private _listaParaEnviar: string[] = [];
  private _listaAplanadaDelServidor: DTOMenuMatchPorCodigoRol[] = [];
  listaDesdeServidor: DTOMenuMatchPorCodigoRol[] = [];

  //======================================================================
  //Ciclo de vida
  //======================================================================
  constructor() {
    this._aplanarListaDeServidor(); //"aplana" la lista para futuros usos
    this._agregarItemsSeleccionadosAListaParaEnviar(this.listaDesdeServidor);
  }

  //======================================================================
  //Accesores
  //======================================================================
  get menues$() {
    return this._menues.asObservable();
  }

  set menues({ codigo, codigoPadre }) {
    const seleccionado: boolean = this._menuEstaSeleccionado(codigo)
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
    const indexEncontrado: number = this._buscarIndexPorMenuCodigo(menuCodigo);
    return indexEncontrado != -1;
  }

  /** Retorna el indice de la "listaParaEnviar" de acuerdo a un menúCodigo */
  private _buscarIndexPorMenuCodigo(menuCodigo: string): number {
    return this._listaParaEnviar.findIndex(x => x === menuCodigo) ?? -1;
  }

  private _agregarItemYPadres(menuCodigo: string, menuCodigoPadre: string) {
    this._agregarItem(menuCodigo);//agregarItem
    const codigosPadres: string[] = this._buscarCodigosPadresSegunCodigoParaAgregar(menuCodigoPadre); //buscar codigosPadres
    codigosPadres.forEach(codigo => this._agregarItem(codigo)); //agregar codigo encontrados
  }

  /**Agrega un item a la "listaParaEnviar" */
  private _agregarItem(menuCodigo: string) {
    //verifica que no esté en la lista antes de agregar
    const indexEncontrado: number = this._listaParaEnviar.findIndex(x => x === menuCodigo) ?? -1;
    if (indexEncontrado == -1) { //si no hay resultados -> agregar
      this._listaParaEnviar.push(menuCodigo);
      this._actualizarValor();
    }
  }

  /**Devuelve una lista con todos los padres de "codigoPadre" */
  private _buscarCodigosPadresSegunCodigoParaAgregar(codigoPadre: string): string[] {
    // Filtrar elementos con el código padre dado
    const elementosConCodigoPadre: DTOMenuMatchPorCodigoRol[] = this._listaAplanadaDelServidor.filter(item => item.codigo === codigoPadre);

    // Obtener los códigos de los elementos encontrados
    let codigosEncontrados: string[] = elementosConCodigoPadre.map(item => item.codigo);

    // Recorrer los elementos encontrados y buscar sus códigos padres
    elementosConCodigoPadre.forEach(item => {
      const codigoPadre: string = item.codigoPadre;
      if (codigoPadre) {
        // Filtrar elementos con el código padre
        const elementoPadre: DTOMenuMatchPorCodigoRol = this._listaAplanadaDelServidor.find(itemPadre => itemPadre.codigo === codigoPadre);
        if (elementoPadre) {
          // Agregar el código del elemento padre al resultado
          codigosEncontrados.push(elementoPadre.codigo);
        }
      }
    });
    return codigosEncontrados;
  }

  private _quitarItemYPadres(menuCodigo: string, menuCodigoPadre: string) {
    this._eliminarItem(menuCodigo);
    const codigosPadres: string[] = this._buscarCodigosPadresSegunCodigoParaQuitar(menuCodigoPadre); //buscar codigosPadres
    codigosPadres.forEach(codigo => this._eliminarItem(codigo)); //quitar codigo encontrados
    this._actualizarValor();
  }

  /**Eliminar un item a la "listaParaEnviar" */
  private _eliminarItem(menuCodigo: string) {
    const index: number = this._buscarIndexPorMenuCodigo(menuCodigo);
    this._listaParaEnviar.splice(index, 1);
  }


  /**Este método tiene una lógica de NO ELIMINAR al padre si el codigo tiene hermanos
   * Solo si es hijo UNICO elimino al papá
   */
  private _buscarCodigosPadresSegunCodigoParaQuitar(codigoPadre: string): string[] {
    // Filtrar elementos con el código padre dado
    const hermanos: DTOMenuMatchPorCodigoRol[] = this._listaAplanadaDelServidor.filter(item => item.codigoPadre === codigoPadre);
    const tieneHermanos: boolean = hermanos.length > 1;
    const tieneHermanosSeleccionados: boolean = hermanos.some(item => this._listaParaEnviar.includes(item.codigo));

    if (tieneHermanos && tieneHermanosSeleccionados) {
      return [];
    }

    const elementosConCodigoPadre: DTOMenuMatchPorCodigoRol[] = this._listaAplanadaDelServidor.filter(item => item.codigo === codigoPadre);
    // Obtener los códigos de los elementos encontrados
    let codigosEncontrados: string[] = elementosConCodigoPadre.map(item => item.codigo);

    // Recorrer los elementos encontrados y buscar sus códigos padres
    elementosConCodigoPadre.forEach(item => {
      const codigoPadre: string = item.codigoPadre;
      if (codigoPadre) {
        // Filtrar elementos con el código padre
        const elementoPadre: DTOMenuMatchPorCodigoRol = this._listaAplanadaDelServidor.find(itemPadre => itemPadre.codigo === codigoPadre);
        if (elementoPadre) {
          // Agregar el código del elemento padre al resultado
          codigosEncontrados.push(elementoPadre.codigo);
        }
      }
    });
    return codigosEncontrados;
  }

  private _actualizarValor() {
    this._menues.next(this._listaParaEnviar);
  }

  private _aplanarListaDeServidor() {
    this.listaDesdeServidor.forEach(x => {
      this._procesarAplanamiento(x, this._listaAplanadaDelServidor);
    });
  }

  private _procesarAplanamiento(menu: any, resultArray: any[] = []) {
    resultArray.push(menu);

    if (menu.menuesHijos) {
      menu.menuesHijos.forEach((submenu: any) => {
        this._procesarAplanamiento(submenu, resultArray);
      });
    }
    return resultArray;
  }

  /**Se llama cuando la respuesta del servidor ya está lista, aquí se agregan solamente los items
 * que ya están seleccionados
 */
  private _agregarItemsSeleccionadosAListaParaEnviar(listaDesdeServidor: DTOMenuMatchPorCodigoRol[]) {
    listaDesdeServidor.forEach(item => {
      //Agregar a los menúes con ruta
      if (item.tipo == 'basico' && item.tienePermiso) {
        this._agregarItemYPadres(item.codigo, item.codigoPadre);
      }
      this._agregarItemsSeleccionadosAListaParaEnviar(item.hijos);
    });
  }
}
