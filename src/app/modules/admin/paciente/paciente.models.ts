import { Cie, CodigoAlerta } from "src/app/shared/models/shared.models";
import { DTOPsicologoCombo } from "../psicologo/psicologo.models";
import { DTOAtencionHistoriaItem } from "../atencion/atencion.models";

export interface DTOPacienteCrearEditarRequest {
    id: number;

    //Datos personales
    apPaterno: string;
    apMaterno: string;
    nombres: string;
    fechaNacimiento: string; //fecha
    dni: string;
    lugarNacimiento: string;
    direccion: string;
    departamento: string;
    provincia: string;
    distrito: string;
    numeroContacto: string;
    sexo: string;
    nacionalidad: string;
    correo: string;
    carreraOProfesion: string;
    ocupacion: string;

    //Nivel socioeconómico
    tipoVivienda: string;
    habitacionesOcamas: string;
    serviciosBasicos: string;
    gastosMensuales: string;
    informacionGastoFamiliar: string;
    tipoDeSeguro: string;
    categorizacionSocioeconomica: string;

    //Familiar
    contactoEmergencia: string;
    parentezcoContactoEmergencia: string;
    numeroContactoEmergencia: string;

    habilitado: boolean;
}

export interface DTOPacienteEncontrado {
    id: number;

    //Datos personales
    apPaterno: string;
    apMaterno: string;
    nombres: string;
    fechaNacimiento: string; //fecha
    dni: string;
    lugarNacimiento: string;
    direccion: string;
    departamento: string;
    provincia: string;
    distrito: string;
    numeroContacto: string;
    sexo: string;
    nacionalidad: string;
    correo: string;
    carreraOProfesion: string;
    ocupacion: string;

    //Nivel socioeconómico
    tipoVivienda: string;
    habitacionesOcamas: string;
    serviciosBasicos: string;
    gastosMensuales: string;
    informacionGastoFamiliar: string;
    tipoDeSeguro: string;
    categorizacionSocioeconomica: string;

    //Familiar
    contactoEmergencia: string;
    parentezcoContactoEmergencia: string;
    numeroContactoEmergencia: string;

    habilitado: boolean;
}

export interface DTOPacienteListar {
    id: number;
    apPaterno: string;
    apMaterno: string;
    nombres: string;
    nacionalidad: string;
    fechaNacimiento: string; //fecha
    dni: string;
    sexo: string;
    numeroContacto: string;
}

export interface DTOPacienteHistoriaItem {
    id: number;
    nombresCompletos: string;
    aspectroPresuntivo: string;
    sexo: string;
    edad: number;
    nacionalidad: string;
    cie: Cie[];
    codigosAlerta: CodigoAlerta[];
}

export interface DTOPacienteHistoria {
    paciente: DTOPacienteHistoriaItem;
    psicologo: DTOPsicologoCombo;
    atenciones: DTOAtencionHistoriaItem[];
    numAtencionesCanceladas: number
}