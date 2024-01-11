import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationItem } from 'src/app/core/navigation/navigation-item.interface';
import { MENUES_SESION } from 'src/app/core/utils/constants.utils';
import { environment } from 'src/environments/environment.dev';
import { DTOMenuNavegacion } from './menu.model';
import { DTORolUsuario } from '../rol/rol.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private url: string = `${environment.HOST}/v1/menues`;

  constructor(
    private _http: HttpClient
  ) { }

  //=========================================================================
  // Métodos accesores
  //=========================================================================
  get menuesEnSesion(): any[] {
    return JSON.parse(sessionStorage.getItem(MENUES_SESION));
  }

  set menuesEnSesion(menues: any[]) {
    sessionStorage.setItem(MENUES_SESION, JSON.stringify(menues));
  }

  //=========================================================================
  // Métodos utilitarios
  //=========================================================================
  //Busca un ID de menu en todos los menues, retorna un booleano 
  menuTienePermiso(idMenu: string): boolean {
    const menuesEnMemoria: NavigationItem[] = JSON.parse(sessionStorage.getItem("MENUES")!);

    function buscarMenu(menu: NavigationItem): boolean {
      if (menu.id === idMenu) {
        return true;
      }
      return menu.children?.some(hijo => buscarMenu(hijo)) || false;
    }
    return menuesEnMemoria.some(menu => buscarMenu(menu));
  }

  //Busca un ID de menu en todos los menues, retorna un booleano 
  menuTienePermisoPorRuta(ruta: string): boolean {
    const menuesEnMemoria: NavigationItem[] = JSON.parse(sessionStorage.getItem("MENUES")!);
    function buscarMenu(menu: NavigationItem): boolean {
      if (menu?.link?.includes(ruta)) {
        return true;
      }
      return menu.children?.some(hijo => buscarMenu(hijo)) || false;
    }
    return menuesEnMemoria.some(menu => buscarMenu(menu));
  }

  ordenarPorNumeroOrden(listaInicial: DTOMenuNavegacion[]): DTOMenuNavegacion[] {
    return listaInicial.sort(((a, b) => a.numeroOrden - b.numeroOrden));
  }

  eliminarMenuesRepetidos(listaInicial: DTOMenuNavegacion[]): DTOMenuNavegacion[] {
    //Otra forma 
    return listaInicial.filter((menu, index, self) =>
      !self.slice(index + 1).some(otherMenu => otherMenu.id === menu.id)
    );
  }

  guardarListaMenuesDesdeListaRoles(listaRoles: DTORolUsuario[]): void {
    //Unir en un solo array
    const menues: DTOMenuNavegacion[] = listaRoles.flatMap(x => x.menues);

    //eliminar elementos repetidos
    let menuesFiltrados = this.eliminarMenuesRepetidos(menues);
    this.menuesEnSesion = menuesFiltrados;
  }
}
