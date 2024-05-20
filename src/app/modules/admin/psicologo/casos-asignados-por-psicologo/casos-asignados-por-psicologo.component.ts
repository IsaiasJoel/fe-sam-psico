import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalAtencionesCanceladasComponent } from './modal-atenciones-canceladas/modal-atenciones-canceladas.component';
import { DTOPsicologoCasoAsignado } from '../psicologo.models';

@Component({
  selector: 'casos-asignados-por-psicologo',
  templateUrl: './casos-asignados-por-psicologo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CasosAsignadosPorPsicologoComponent {
  //=========================================================
  //Variables
  //=========================================================
  casosAsignados: DTOPsicologoCasoAsignado = {
    idPsicologo: 1,
    psicologo: 'Marjorie Horna',
    estadistica: {
      proceso: 3,
      culminados: 10,
      totalAsignados: 13
    },
    casos: [
      {
        estado: 'En proceso',
        idPaciente: 1,
        paciente: 'Isaías Joel Domínguez Montalbán',
        edad: 24,
        nacionalidad: 'PERU',
        motivoConsulta: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
        aspectroPresuntivo: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
        cie: [
          { codigo: 'A', descripcion: 'CIE-A' },
          { codigo: 'B', descripcion: 'CIE-B' }
        ],
        codigosAlerta: [
          { codigo: 'A', descripcion: 'ALERTA-A' },
          { codigo: 'B', descripcion: 'ALERTA-B' }
        ]
      },
      {
        estado: 'En proceso',
        idPaciente: 2,
        paciente: 'María Vasquez Herrera',
        edad: 28,
        nacionalidad: 'VENEZUELA',
        motivoConsulta: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
        aspectroPresuntivo: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
        cie: [
          { codigo: 'A', descripcion: 'CIE-A' },
          { codigo: 'B', descripcion: 'CIE-B' }
        ],
        codigosAlerta: [
          { codigo: 'A', descripcion: 'ALERTA-A' },
          { codigo: 'B', descripcion: 'ALERTA-B' }
        ]
      },
      {
        estado: 'Culminado',
        idPaciente: 3,
        paciente: 'Artleth Guerrero Paz',
        edad: 24,
        nacionalidad: 'PERU',
        motivoConsulta: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
        aspectroPresuntivo: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
        cie: [
          { codigo: 'A', descripcion: 'CIE-A' },
          { codigo: 'B', descripcion: 'CIE-B' }
        ],
        codigosAlerta: [
          { codigo: 'A', descripcion: 'ALERTA-A' },
          { codigo: 'B', descripcion: 'ALERTA-B' }
        ]
      },
      {
        estado: 'En proceso',
        idPaciente: 4,
        paciente: 'Luis Nevado Sanchez',
        edad: 28,
        nacionalidad: 'PERU',
        motivoConsulta: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
        aspectroPresuntivo: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
        cie: [
          { codigo: 'A', descripcion: 'CIE-A' },
          { codigo: 'B', descripcion: 'CIE-B' }
        ],
        codigosAlerta: [
          { codigo: 'A', descripcion: 'ALERTA-A' },
          { codigo: 'B', descripcion: 'ALERTA-B' }
        ]
      }
    ]
  };

  //=========================================================
  //Ciclo de vida
  //=========================================================
  constructor(
    private _router: Router,
    private _matDialog: MatDialog
  ) { }

  //=========================================================
  //Métodos privados
  //=========================================================

  //=========================================================
  //Métodos públicos
  //=========================================================
  // verAtencionesCanceladas(idPaciente: number) {
  //   this._matDialog.open(ModalAtencionesCanceladasComponent, { data: { pPacienteId: idPaciente } });
  // }

  // irAPantallaHistoriaClinica(idPaciente: number) {
  //   this._router.navigate(['pacientes/historias/',idPaciente]);
  // }
}
