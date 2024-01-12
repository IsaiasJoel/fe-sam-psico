import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor() { }

  preguntarSiNo(accion: string) {
    return Swal.fire({
      title: '¿Estás seguro?',
      text: accion,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: 'Cancelar'
    });
  }

  mostrarMensaje(titulo: string, descripcion: string, tipo: SweetAlertType) {
    Swal.fire({
      title: titulo,
      text: descripcion,
      icon: tipo
    });
  }

}

export type SweetAlertType = 'warning' | 'success' | 'error';