import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-modal-usuario-horario-atencion',
  templateUrl: './modal-usuario-horario-atencion.component.html'
})
export class ModalUsuarioHorarioAtencionComponent {
  usuario: any;

  //===========================================================
  // Ciclo de vida
  //===========================================================
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { pId: number },
    public matRef: MatDialogRef<ModalUsuarioHorarioAtencionComponent>,
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
  }
}
