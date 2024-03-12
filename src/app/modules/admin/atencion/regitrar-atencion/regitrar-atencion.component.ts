import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DTOServicioListar } from '../../servicio/servicio.model';

@Component({
  selector: 'regitrar-atencion',
  templateUrl: './regitrar-atencion.component.html'
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
  psicologos: any[] = [];
  ambientes: any[] = [];

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
    const servicio:DTOServicioListar = this.servicios[0];
    const proyecto = this.proyectos[0];
    const modalidad = 'PRESENCIAL';

    this.form.patchValue({
      servicio: servicio,
      proyecto: proyecto,
      modalidad: modalidad,
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

  // actualizarColaboracionEconomica(item:DTOServicioListar){
  //   console.log(item);
    
  // }
}
