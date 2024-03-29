import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DTOServicioListar } from '../../servicio/servicio.model';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';

@Component({
  selector: 'regitrar-atencion',
  templateUrl: './regitrar-atencion.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegitrarAtencionComponent implements OnInit {
  //==================================================
  // Variables
  //==================================================
  form: FormGroup;
  servicios: DTOServicioListar[] = [
    { id: 1, descripcion: 'Atención costo social', costo: 30, habilitado: true },
    { id: 2, descripcion: 'Atención ambulatoria', costo: 10, habilitado: true },
    { id: 3, descripcion: 'Atención de emergencia', costo: 50, habilitado: true }
  ];
  proyectos: any[] = [
    { id: 1, nombre: 'Centro de escucha' },
    { id: 2, nombre: 'Contigo' },
    { id: 3, nombre: 'Despegue adolescente' }
  ];
  psicologos: any[] = [
    { id: 1, nombre: 'Luis Nevado' },
    { id: 2, nombre: 'Marjorie Horna' },
    { id: 3, nombre: 'Fiorella Chanta' },
    { id: 4, nombre: 'Betsabeth Cabrera' },
    { id: 5, nombre: 'Elisa Nevado' }
  ];
  ambientes: any[] = [
    { id: 1, nombre: 'Ambiente 1' },
    { id: 2, nombre: 'Ambiente 2' },
    { id: 3, nombre: 'Ambiente 3' }
  ];

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      const date = cellDate.getDate();

      // Highlight the 1st and 20th day of each month.
      return date === 1 || date === 20 ? 'example-custom-date-class' : '';
    }

    return '';
  };

  //==================================================
  // Ciclo de vida
  //==================================================
  constructor(
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this._iniciarFormulario();
  }

  //==================================================
  // Métodos privados
  //==================================================
  private _iniciarFormulario() {
    this.form = this._formBuilder.group({
      dniPaciente: [],
      servicio: [],
      proyecto: [],
      organizacionRefiere: [],
      motivoConsulta: [],
      modalidad: [],
      horarioDisponibilidad: [],
      psicologo: [],
      ambiente: [],
      colaboracionEconomica: []
    });

    this._cargarDatosPorDefecto();
  }

  private _cargarDatosPorDefecto() {
    const servicio: DTOServicioListar = this.servicios[0];
    const proyecto = this.proyectos[0];
    const modalidad = 'PRESENCIAL';

    this.form.patchValue({
      servicio: servicio,
      proyecto: proyecto,
      modalidad: modalidad,
      psicologo: 'Seleccionar',
      ambiente: 'Seleccionar',
      colaboracionEconomica: servicio.costo
    });
  }

  //==================================================
  // Métodos públicos
  //==================================================

  procesarSolicitud() {

  }

  regresarAListar() {

  }

  // abrirHorario() {

  // }
}
