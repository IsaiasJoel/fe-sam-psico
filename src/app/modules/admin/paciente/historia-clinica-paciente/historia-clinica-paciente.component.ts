import { Component } from '@angular/core';

@Component({
  selector: 'historia-clinica-paciente',
  templateUrl: './historia-clinica-paciente.component.html'
})
export class HistoriaClinicaPacienteComponent {
  historia: any = {
    idPaciente: 1,
    paciente: 'Isaías Joel Domínguez Montalbán',
    sexo: 'Masculino',
    edad: '24 años',
    nacionalidad: 'Perú',
    atenciones: [
      {
        fechaHora: '20/02/2024 4:00 - 6:00 pm',
        ambiente: 'Consultorio 1',
        estadoPago: 'PAGADO',
        notas: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        archivosAdjuntos: [
          { tipo: 'PDF', nombre: 'Archivo 1', contenido: '' },
          { tipo: 'PDF', nombre: 'Archivo 2', contenido: '' },
          { tipo: 'IMG', nombre: 'Archivo 3', contenido: '' },
          { tipo: 'IMG', nombre: 'Archivo 4', contenido: '' }
        ]
      }
    ]
  }
}
