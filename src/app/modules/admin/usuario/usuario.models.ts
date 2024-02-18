//========================================
// TYPES
//========================================
export type EstadoAtencionType = 'En proceso' | 'Culminado';

//========================================
// INTERFACES
//========================================
export interface DTOUsuarioListar {
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

export interface DTOUsuarioEnSesion {
    id: string;
    apPaterno: string;
    apMaterno: string;
    nombres: string;
    roles: any[];
}

export interface DTOUsuarioCrearEditarRequest {
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
    contrasenia: string;
}

export interface DTOUsuarioEncontrado {
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

export interface DTOCasoAsignadoPorUsuario {
    idUsuario: number;
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