import { Component, Input } from '@angular/core';
import { DTOMenuNavegacion } from 'src/app/modules/admin/menu/menu.model';

@Component({
  selector: 'group-navigation',
  templateUrl: './group-navigation.component.html'
})
export class GroupNavigationComponent {
  @Input() item: DTOMenuNavegacion;

  constructor() { }

  // -----------------------------------------------------------------------------------------------------
  // @ Ciclo de vida
  // -----------------------------------------------------------------------------------------------------

  ngOnInit(): void {
  }
  // -----------------------------------------------------------------------------------------------------
  // @ Métodos públicos
  // -----------------------------------------------------------------------------------------------------

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
