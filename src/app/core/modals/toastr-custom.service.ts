import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastrCustomService {

  constructor(
    private _toastrLibService: ToastrService
  ) { }

  mostrar(titulo: string, mensaje: string, accion: ToastrType) {
    switch (accion) {
      case 'Success':
        this._toastrLibService.success(mensaje, titulo);
        break;
      case 'Info':
        this._toastrLibService.info(mensaje, titulo);
        break;
      case 'Warning':
        this._toastrLibService.warning(mensaje, titulo);
        break;
      case 'Error':
        this._toastrLibService.error(mensaje, titulo);
        break;
    }
  }
}

export type ToastrType = 'Success' | 'Info' | 'Warning' | 'Error'; 