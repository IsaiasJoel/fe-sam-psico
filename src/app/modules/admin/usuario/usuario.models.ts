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
    casosAsignados: number;
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