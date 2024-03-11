/* eslint-disable */
import { DateTime } from 'luxon';
import { DTODataDashboard } from './dashboard.models';

/* Get the current instant */
const now = DateTime.now();

export const DASHBOARD_DATA: DTODataDashboard = {
    resumenAtenciones: [
        { titulo: 'Total pacientes', valor: 117, claseColor: 'text-blue-500' },
        { titulo: 'Atendidos', valor: 38, claseColor: 'text-green-500' },
        { titulo: 'En proceso de atención', valor: 24, claseColor: 'text-amber-500' },
        { titulo: 'Por atender', valor: 17, claseColor: 'text-red-500' }
    ],
    casosAtendidos: {
        labels: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sab', 'Dom'],
        series: [
            { name: 'Casos atendidos', data: [5, 3, 1, 4, 2, 6, 4] }
        ]
    },
    recaudacion: {
        totalRecaudado: 250,
        totalAtenciones: 10,
        atencionesPagadas: 8,
        atencionesPendientesPago: 1,
        atencionesSinPagar: 1
    },
    rangoEdades: {
        labels: ['Niño', 'Adolescente', 'Adulto', 'Adulto Mayor'],
        series: [19, 16, 42, 23]

    },
    proximasAtenciones: [
        {
            paciente: 'Luisa Vasquez Montalvo',
            psicologo: 'Luis Nevado',
            hora: 'in 32 minutes',
            fecha: '2 de agosto 2024',
            ambiente: 'Conference room 1B'
        },
        {
            paciente: 'Alex Martinez',
            psicologo: 'Luis Nevado',
            hora: '10:30 AM',
            fecha: '2 de agosto 2024',
            ambiente: 'Conference room 1B'
        },
        {
            paciente: 'Harlex Torres',
            psicologo: 'Luis Nevado',
            hora: '11:00 AM',
            fecha: '2 de agosto 2024',
            ambiente: 'Conference room 1B'
        },
        {
            paciente: 'Zoe Ortega Diaz',
            psicologo: 'Luis Nevado',
            hora: '12:10 PM',
            fecha: '2 de agosto 2024',
            ambiente: 'Conference room 1B'
        },
        {
            paciente: 'Luis Montalvo Herrera',
            psicologo: 'Luis Nevado',
            hora: '05:30 PM',
            fecha: '2 de agosto 2024',
            ambiente: 'Magnolia',
        },
        {
            paciente: 'Maria Velez',
            psicologo: 'Luis Nevado',
            hora: '07:30 PM',
            fecha: '2 de agosto 2024',
            ambiente: 'Home'
        },
        {
            paciente: 'Lucia Cabrera',
            psicologo: 'Luis Nevado',
            hora: '09:30 PM',
            fecha: '2 de agosto 2024',
            ambiente: 'Overseer\'s room'
        }
    ],
    comparacionMayoriaEdad: {
        labels: ['Mayor de edad', 'Menor de edad'],
        series: [19, 6]
    },
    comparacionDiagnosticoPreventivo: {
        labels: ['Depresión', 'Ansiedad', 'Xenofobia', 'Población vulnerable'],
        series: [19, 6, 7, 19]
    },
    comparacionNacionalidad: {
        labels: ['Perú', 'Venezuela', 'Colombia', 'Ecuador', 'Bolivia', 'Argentina'],
        series: [19, 6, 7, 16, 1, 1]
    }
};