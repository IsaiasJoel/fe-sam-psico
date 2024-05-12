//========================================
// TYPES

import { Cie, CodigoAlerta } from "src/app/shared/models/shared.models";

//========================================
export type EstadoAtencionType = 'En proceso' | 'Culminado';

//========================================
// INTERFACES
//========================================
export interface DTOPsicologoListar {
    id: number;
    apPaterno: string;
    apMaterno: string;
    nombres: string;
    fechaNacimiento: string;
    carrera: string;
    especialidad: string;
    dni: string;
    casosAsignados: number;
    habilitado: boolean;
}

export interface DTOPsicologoCrearEditarRequest {
    id: number;
    universidad: string;
    anioEgreso: string;
    esColegiado: boolean;
    numColegiatura: string;
    especialidad: string;
    resumenProfesional: string;
}

export interface DTOPsicologoEncontrado {
    id: number;
    apPaterno: string;
    apMaterno: string;
    nombres: string;
    dni: string;
    fechaNacimiento: string;
    sexo: string;
    celular: string;
    nacionalidad: string;
    carrera: string;
    especialidad: string;
    universidad: string;
    anioEgreso: string;
    colegiado: boolean;
    numeroColegiatura: string;
    resumenProfesional: string;
    habilitado: boolean;
    correo: string;
}

export interface DTOCasoAsignadoPorPsicologo {
    idPsicologo: number;
    usuario: string; //Nombres completos del voluntarios
    estadistica: {
        proceso: number;
        culminados: number;
        totalAsignados: number;
    }
    casos: DTCasoAsignado[]
}

export interface DTCasoAsignado {
    estado: EstadoAtencionType;
    paciente: string;
    idPaciente: number;
    edad: number;
    nacionalidad: string;
    motivoConsulta: string;
    diagnostico: string;
    atencionesEfectivas: number;
    atencionesCanceladas: number;
    proximasAtenciones: DTOAtencionCasoAsignado[];
}

export interface DTOAtencionCasoAsignado {
    dia: string,
    hora: string,
    mes: string,
    ambiente: string
}

export interface DTOPsicologoCombo {
    id: number;
    nombresCompletos: string;
}

export interface DTOPsicologoCasoAsignado {
    idPsicologo: number;
    psicologo: string;
    estadistica: DTOPsicologoCasoAsignadoEstadistica;
    casos: DTOPsicologoCasoAsignadoCaso[];
}

export interface DTOPsicologoCasoAsignadoEstadistica {
    proceso: number;
    culminados: number;
    totalAsignados: number;
}

export interface DTOPsicologoCasoAsignadoCaso {
    estado: string;
    idPaciente: number;
    paciente: string;
    edad: number;
    nacionalidad: string;
    motivoConsulta: string;
    aspectroPresuntivo: string;
    cie: Cie[];
    codigosAlerta: CodigoAlerta[];
}