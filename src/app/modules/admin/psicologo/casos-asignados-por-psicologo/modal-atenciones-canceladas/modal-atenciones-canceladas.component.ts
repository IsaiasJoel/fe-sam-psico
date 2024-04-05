import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'modal-atenciones-canceladas',
  templateUrl: './modal-atenciones-canceladas.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalAtencionesCanceladasComponent {

  //=============================================================
  // Variables
  //=============================================================
  atencionesCanceladas: any[] = [
    { fechaCancelacion: '10/01/2024 10:00 pm', fechaCita: '11/01/2024 10:00 am', motivo: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, nemo! Voluptatum nam alias sed? Laboriosam, consectetur corrupti! Eum culpa quod animi quas recusandae maxime? Temporanecessitatibus ea nostrum velit non!' },
    { fechaCancelacion: '10/02/2024 10:00 pm', fechaCita: '11/02/2024 10:00 am', motivo: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, nemo! Voluptatum nam alias sed? Laboriosam, consectetur corrupti! Eum culpa quod animi quas recusandae maxime? Temporanecessitatibus ea nostrum velit non!' },
  ];

  //=============================================================
  // Ciclo de vida
  //=============================================================
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { pPacienteId: number },
    public matRef: MatDialogRef<ModalAtencionesCanceladasComponent>
  ) { }

  //=============================================================
  // Métodos privados
  //=============================================================

  //=============================================================
  // Métodos públicos
  //=============================================================
}
