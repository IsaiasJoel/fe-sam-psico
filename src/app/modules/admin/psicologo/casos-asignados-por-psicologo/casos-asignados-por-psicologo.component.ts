import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalAtencionesCanceladasComponent } from './modal-atenciones-canceladas/modal-atenciones-canceladas.component';

@Component({
  selector: 'casos-asignados-por-psicologo',
  templateUrl: './casos-asignados-por-psicologo.component.html'
})
export class CasosAsignadosPorPsicologoComponent {
  //=========================================================
  //Variables
  //=========================================================
  casosAsignados: any = {
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
        diagnostico: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
        atencionesEfectivas: 3,
        atencionesCanceladas: 2,
        proximasAtenciones: [
          { dia: 'Sabado 17', hora: '10:00 am', mes: 'Febrero', ambiente: 'Consultorio 2' },
          { dia: 'Sabado 24', hora: '10:00 am', mes: 'Febrero', ambiente: 'Consultorio 2' },
          { dia: 'Sabado 02', hora: '10:00 am', mes: 'Marzo', ambiente: 'Consultorio 2' },
        ]
      },
      {
        estado: 'En proceso',
        idPaciente: 2,
        paciente: 'María Vasquez Herrera',
        edad: 28,
        nacionalidad: 'VENEZUELA',
        motivoConsulta: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
        diagnostico: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
        atencionesEfectivas: 1,
        atencionesCanceladas: 0,
        proximasAtenciones: [
          { dia: 'Lunes 12', hora: '10:00 am', mes: 'Febrero', ambiente: 'Consultorio 2' },
        ]
      },
      {
        estado: 'Culminado',
        idPaciente: 3,
        paciente: 'Artleth Guerrero Paz',
        edad: 24,
        nacionalidad: 'PERU',
        motivoConsulta: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
        diagnostico: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
        atencionesEfectivas: 2,
        atencionesCanceladas: 0,
        proximasAtenciones: []
      },
      {
        estado: 'En proceso',
        idPaciente: 4,
        paciente: 'Luis Nevado Sanchez',
        edad: 28,
        nacionalidad: 'PERU',
        motivoConsulta: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
        diagnostico: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
        atencionesEfectivas: 5,
        atencionesCanceladas: 0,
        proximasAtenciones: [
          { dia: 'Miércoles 14', hora: '10:00 am', mes: 'Febrero', ambiente: 'Consultorio 2' },
          { dia: 'Miércoles 21', hora: '10:00 am', mes: 'Febrero', ambiente: 'Consultorio 2' },
          { dia: 'Miércoles 28', hora: '10:00 am', mes: 'Febrero', ambiente: 'Consultorio 2' },
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
  verAtencionesCanceladas(idPaciente: number) {
    this._matDialog.open(ModalAtencionesCanceladasComponent, { data: { pPacienteId: idPaciente } });
  }

  irAPantallaHistoriaClinica(idPaciente: number) {
    this._router.navigate(['pacientes/historias/',idPaciente]);
  }
}
