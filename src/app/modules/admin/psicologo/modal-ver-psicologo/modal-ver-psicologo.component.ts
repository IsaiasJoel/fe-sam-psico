import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DTOPsicologoEncontrado } from '../psicologo.models';
import { PsicologoService } from '../psicologo.service';
import { ApiResponse } from 'src/app/core/models/api-response.interface';
import { lastValueFrom } from 'rxjs';
import { VER_USUARIO_ENCONTRADO } from './modal-ver-psicologo.mock';

@Component({
  selector: 'app-modal-ver-psicologo',
  templateUrl: './modal-ver-psicologo.component.html'
})
export class ModalVerPsicologoComponent implements OnInit {
  psicologo: DTOPsicologoEncontrado;

  //===========================================================
  // Ciclo de vida
  //===========================================================
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { pId: number },
    public matRef: MatDialogRef<ModalVerPsicologoComponent>,
    private _psicologoService: PsicologoService
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
    // const http$ = this._psicologoService.buscarPsicologoPorId$(this.data.pId);
    // const respuestaServidor: ApiResponse = await lastValueFrom(http$);
    // this.psicologo = respuestaServidor.data;

    this.psicologo = VER_USUARIO_ENCONTRADO;
  }
}
