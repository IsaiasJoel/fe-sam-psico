import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { AmbienteService } from './ambiente.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { DTOAmbienteListar } from './ambiente.model';
import { Observable, lastValueFrom } from 'rxjs';
import { ModalCrearAmbienteComponent } from './modal-crear-ambiente/modal-crear-ambiente.component';
import { CONSULTA_CORRECTA } from 'src/app/shared/data/shared.data';
import { ModalEditarAmbienteComponent } from './modal-editar-ambiente/modal-editar-ambiente.component';
import { ApiResponse } from 'src/app/core/models/api-response.interface';

@Component({
  selector: 'app-ambiente',
  templateUrl: './ambiente.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AmbienteComponent {
  ambientes: DTOAmbienteListar[] = [];

  //===================================================
  // Ciclo de vida
  //===================================================
  constructor(
    private _ambienteService: AmbienteService,
    private _toastr: ToastrService,
    private _matDialog: MatDialog,
    private _changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this._listar();
  }

  //===================================================
  // Métodos privados
  //===================================================
  private async _listar() {
    const http$ = this._ambienteService.listarTodos$();
    this.ambientes = await lastValueFrom(http$);
    this._changeDetectorRef.markForCheck();
  }

  //===================================================
  // Métodos públicos
  //===================================================
  abrirModalCrear() {
    const ref = this._matDialog.open(ModalCrearAmbienteComponent, { width: '60%' });
    ref.afterClosed().subscribe(respuestaModal => {
      if (respuestaModal == 'OK') {
        this._listar();
        this._toastr.success(CONSULTA_CORRECTA);
      }
    });
  }

  abrirModalEditar(codigo: string) {
    const ref = this._matDialog.open(ModalEditarAmbienteComponent, { data: { pId: codigo } });
    ref.afterClosed().subscribe(respuestaModal => {
      if (respuestaModal == 'OK') {
        this._listar();
      }
    });
  }
}
