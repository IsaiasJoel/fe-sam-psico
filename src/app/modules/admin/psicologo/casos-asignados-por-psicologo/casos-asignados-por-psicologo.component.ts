import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DTOPsicologoCasoAsignado } from '../psicologo.models';
import { PsicologoService } from '../psicologo.service';
import { concatMap } from 'rxjs';

@Component({
  selector: 'casos-asignados-por-psicologo',
  templateUrl: './casos-asignados-por-psicologo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CasosAsignadosPorPsicologoComponent implements OnInit {
  //=========================================================
  //Variables
  //=========================================================
  casosAsignados: DTOPsicologoCasoAsignado;

  //=========================================================
  //Ciclo de vida
  //=========================================================
  constructor(
    // private _router: Router,
    // private _matDialog: MatDialog,
    private _psicologoService: PsicologoService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._obtenerData();
  }

  //=========================================================
  //Métodos privados
  //=========================================================
  private _obtenerData() {
    this._route.paramMap
      .pipe(
        concatMap(params => {
          const id = Number(params.get('id'));
          return this._psicologoService.listarCasosAsignadosPorPsicologo$(id);
        })
      ).subscribe(casosAsignados => {
        this.casosAsignados = casosAsignados;
        this._changeDetectorRef.markForCheck();
      });
  }

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
