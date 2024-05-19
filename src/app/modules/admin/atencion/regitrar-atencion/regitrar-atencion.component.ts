import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DTOServicioListar } from '../../servicio/servicio.model';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { Proyecto } from 'src/app/shared/models/shared.models';
import { DTOPsicologoCombo } from '../../psicologo/psicologo.models';
import { DTOAmbienteCombo } from '../../ambiente/ambiente.model';

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
    // {
    //   id: 1,
    //   nombre: 'Atención con costo social',
    //   costo: 50,
    //   habilitado: true,
    //   imagen: 'https://cdn.pixabay.com/photo/2018/09/04/11/57/psychotherapy-3652949_960_720.jpg'
    // },
    // {
    //   id: 2,
    //   nombre: 'Terapia fisica',
    //   costo: 100,
    //   habilitado: true,
    //   imagen: 'https://cdn.pixabay.com/photo/2017/08/31/10/16/psychology-2704066_960_720.jpg'
    // },
    // {
    //   id: 3,
    //   nombre: 'Atención médica general',
    //   costo: 80,
    //   habilitado: true,
    //   imagen: 'https://cdn.pixabay.com/photo/2019/04/30/15/42/psychology-4165142_960_720.jpg'
    // }
  ];
  proyectos: Proyecto[] = [
    { id: 1, nombre: 'Centro de escucha' },
    { id: 2, nombre: 'Contigo' },
    { id: 3, nombre: 'Despegue adolescente' }
  ];
  psicologos: DTOPsicologoCombo[] = [
    { id: 1, nombresCompletos: 'Luis Nevado' },
    { id: 2, nombresCompletos: 'Marjorie Horna' },
    { id: 3, nombresCompletos: 'Fiorella Chanta' },
    { id: 4, nombresCompletos: 'Betsabeth Cabrera' },
    { id: 5, nombresCompletos: 'Elisa Nevado' }
  ];
  ambientes: DTOAmbienteCombo[] = [
    // { id: 1, nombre: 'Ambiente 1' },
    // { id: 2, nombre: 'Ambiente 2' },
    // { id: 3, nombre: 'Ambiente 3' }
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
