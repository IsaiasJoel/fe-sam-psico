import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DTOPacienteHistoria } from '../paciente.models';
import { PacienteService } from '../paciente.service';
import { ActivatedRoute } from '@angular/router';
import { concatMap } from 'rxjs';

@Component({
  selector: 'historia-clinica-paciente',
  templateUrl: './historia-clinica-paciente.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoriaClinicaPacienteComponent implements OnInit {
  //===================================================
  // Variables
  //===================================================
  historia: DTOPacienteHistoria = {} as DTOPacienteHistoria;

  //===================================================
  // Ciclo de vida
  //===================================================
  constructor(
    private _pacienteService: PacienteService,
    private _changeDetectorRef: ChangeDetectorRef,
    private _route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._obtenerDatos();
  }

  //===================================================
  // Métodos privados
  //===================================================
  private _obtenerDatos() {
    this._route.paramMap
      .pipe(
        concatMap(params => {
          const id = Number(params.get('id'));
          return this._pacienteService.verAtenciones$(id);
        })
      ).subscribe(historia => {
        this.historia = historia;
        this._changeDetectorRef.markForCheck();
      });
  }

  //===================================================
  // Métodos públicos
  //===================================================
}
