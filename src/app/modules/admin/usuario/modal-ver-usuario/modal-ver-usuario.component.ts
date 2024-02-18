import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DTOUsuarioEncontrado } from '../usuario.models';
import { UsuarioService } from '../usuario.service';
import { ApiResponse } from 'src/app/core/models/api-response.interface';
import { lastValueFrom } from 'rxjs';
import { VER_USUARIO_ENCONTRADO } from './modal-ver-usuario.mock';

@Component({
  selector: 'app-modal-ver-usuario',
  templateUrl: './modal-ver-usuario.component.html'
})
export class ModalVerUsuarioComponent implements OnInit {
  usuario: DTOUsuarioEncontrado;

  //===========================================================
  // Ciclo de vida
  //===========================================================
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { pId: number },
    public matRef: MatDialogRef<ModalVerUsuarioComponent>,
    private _usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this._obtenerDatos();
  }

  //===========================================================
  // Métodos públicos
  //===========================================================


  //===========================================================
  // Métodos privados
  //===========================================================
  private async _obtenerDatos() {
    // const http$ = this._usuarioService.buscarUsuarioPorId$(this.data.pId);
    // const respuestaServidor: ApiResponse = await lastValueFrom(http$);
    // this.usuario = respuestaServidor.data;

    this.usuario = VER_USUARIO_ENCONTRADO;
  }
}
