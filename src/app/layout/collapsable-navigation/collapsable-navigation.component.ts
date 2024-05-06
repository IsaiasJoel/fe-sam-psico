import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';
import { DTOMenuNavegacion } from 'src/app/modules/admin/menu/menu.model';

@Component({
  selector: 'collapsable-navigation',
  templateUrl: './collapsable-navigation.component.html',
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({
          height: 0, opacity: 0
        }),
        style({
          height: 300, opacity: 1
        })
      ]),
      transition(':leave', [
        style({
          height: 300, opacity: 1
        }),
        animate('300ms ease-in', style({
          height: 0, opacity: 0
        }))
      ])
    ])

  ]
})
export class CollapsableNavigationComponent {
  @Input() item: DTOMenuNavegacion;

  isCollapsed: boolean = true;
  isExpanded: boolean = false;

  constructor(
    private _router: Router
  ) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Ciclo de vida
  // -----------------------------------------------------------------------------------------------------
  ngOnInit(): void {
    // If the item has a children that has a matching url with the current url, expand...
    if (this._hasActiveChild(this.item, this._router.url)) {
      this.expand();
    }
    // Otherwise...
    else {
      // If the autoCollapse is on, collapse...
      this.collapse();
    }
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Métodos públicos
  // -----------------------------------------------------------------------------------------------------
  collapse(): void {
    // Return if the item is already collapsed
    if (this.isCollapsed) {
      return;
    }

    // Collapse it
    this.isCollapsed = true;
    this.isExpanded = !this.isCollapsed;
  }

  expand(): void {
    // Return if the item is already expanded
    if (!this.isCollapsed) {
      return;
    }

    // Expand it
    this.isCollapsed = false;
    this.isExpanded = !this.isCollapsed;
  }

  toggleCollapsable(): void {
    // Toggle collapse/expand
    if (this.isCollapsed) {
      this.expand();
    } else {
      this.collapse();
    }
  }

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Métodos privados
  // -----------------------------------------------------------------------------------------------------

  /**
   * Check if the given item has the given url
   * in one of its children
   *
   * @param item
   * @param currentUrl
   * @private
   */
  private _hasActiveChild(item: DTOMenuNavegacion, currentUrl: string): boolean {
    const children = item.hijos;

    if (!children) {
      return false;
    }

    for (const child of children) {
      if (child.hijos) {
        if (this._hasActiveChild(child, currentUrl)) {
          return true;
        }
      }
    }
    return false;
  }
}