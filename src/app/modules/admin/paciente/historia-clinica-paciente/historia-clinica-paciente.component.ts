import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DTOPacienteHistoria } from '../paciente.models';

@Component({
  selector: 'historia-clinica-paciente',
  templateUrl: './historia-clinica-paciente.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoriaClinicaPacienteComponent {
  historia: DTOPacienteHistoria = {
    paciente: {
      id: 1,
      nombresCompletos: 'Isaías Joel Domínguez Montalbán',
      aspectroPresuntivo: '',
      sexo: 'Masculino',
      edad: 24,
      nacionalidad: 'Perú',
      cie: [
        { codigo: 'A', descripcion: 'CIE-A' },
        { codigo: 'B', descripcion: 'CIE-B' }
      ],
      codigosAlerta: [
        { codigo: 'A', nombre: 'ALERTA-A' },
        { codigo: 'B', nombre: 'ALERTA-B' }
      ]
    },
    psicologo: {
      id: 1,
      nombresCompletos: 'Luis Nevado Sánchez',
    },
    atenciones: [
      {
        fechaHora: '20/02/2024 4:00 - 6:00 pm',
        ambiente: 'Consultorio 1',
        estadoPago: 'PAGADO',
        informe: {
          id: 1,
          observacionConducta: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with',
          analisisIntervencion: 'the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
          conclusiones: 'the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
          recomendaciones: 'the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        },
        archivosAdjuntos: [
          { tipo: 'PDF', nombre: 'Archivo 1', url: '' },
          { tipo: 'PDF', nombre: 'Archivo 2', url: '' },
          { tipo: 'IMG', nombre: 'Archivo 3', url: '' },
          { tipo: 'IMG', nombre: 'Archivo 4', url: '' }
        ]
      },
      {
        fechaHora: '20/02/2024 4:00 - 6:00 pm',
        ambiente: 'Consultorio 1',
        estadoPago: 'PENDIENTE',
        informe: {
          id: 1,
          observacionConducta: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with',
          analisisIntervencion: 'the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
          conclusiones: 'the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
          recomendaciones: 'the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        },
        archivosAdjuntos: [
          { tipo: 'PDF', nombre: 'Archivo 1', url: '' },
          { tipo: 'PDF', nombre: 'Archivo 2', url: '' },
          { tipo: 'IMG', nombre: 'Archivo 3', url: '' },
          { tipo: 'IMG', nombre: 'Archivo 4', url: '' }
        ]
      },
      {
        fechaHora: '20/02/2024 4:00 - 6:00 pm',
        ambiente: 'Consultorio 1',
        estadoPago: 'PAGADO',
        informe: {
          id: 1,
          observacionConducta: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with',
          analisisIntervencion: 'the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
          conclusiones: 'the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
          recomendaciones: 'the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        },
        archivosAdjuntos: []
      },
      {
        fechaHora: '20/02/2024 4:00 - 6:00 pm',
        ambiente: 'Consultorio 1',
        estadoPago: 'GRATIS',
        informe: {
          id: 1,
          observacionConducta: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with',
          analisisIntervencion: 'the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
          conclusiones: 'the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
          recomendaciones: 'the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
        },
        archivosAdjuntos: [
          { tipo: 'PDF', nombre: 'Archivo 1', url: '' },
          { tipo: 'PDF', nombre: 'Archivo 2', url: '' },
          { tipo: 'IMG', nombre: 'Archivo 3', url: '' },
          { tipo: 'IMG', nombre: 'Archivo 4', url: '' }
        ]
      }
    ],
    numAtencionesCanceladas: 1
  }
}
