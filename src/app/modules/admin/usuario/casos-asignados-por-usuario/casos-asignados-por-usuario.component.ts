import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'casos-asignados-por-usuario',
  templateUrl: './casos-asignados-por-usuario.component.html'
})
export class CasosAsignadosPorUsuarioComponent {
  //=========================================================
  //Ciclo de vida
  //=========================================================
  constructor(
    private _router: Router
  ) { }

  //=========================================================
  //Métodos privados
  //=========================================================

  //=========================================================
  //Métodos públicos
  //=========================================================
  irAPantallaListar() {

  }
}
