import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DTOMenuNavegacion } from 'src/app/modules/admin/menu/menu.model';


@Component({
  selector: 'basic-navigation',
  templateUrl: './basic-navigation.component.html',
  styleUrls: ['./basic-navigation.component.scss']
})
export class BasicNavigationComponent {
  @Input() item: DTOMenuNavegacion;

  constructor(
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router
  ) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Ciclo de vida
  // -----------------------------------------------------------------------------------------------------

  ngOnInit(): void {
    this._changeDetectorRef.markForCheck();
  }

  irARuta(ruta: string): void {
    this._router.navigate([ruta]);
  }
}
