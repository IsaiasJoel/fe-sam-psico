import { Cie, CodigoAlerta, DTOSexoCombo, Pais, Ubigeo } from "src/app/shared/models/shared.models";
import { DTOPsicologoCombo } from "../psicologo/psicologo.models";
import { DTOAtencionHistoriaItem } from "../atencion/atencion.models";
import { DTOServicioCombo } from "../servicio/servicio.model";
import { DTOAmbienteCombo } from "../ambiente/ambiente.model";

export interface DTOPacienteCrearEditarRequest {
    id: number;
    apPaterno: string;
    apMaterno: string;
    nombres: string;
    docIdentidad: string;
    sexo: DTOSexoCombo;
    fecNacimiento: string; //fecha
    pais: Pais;
    lugarNacimiento: string;
    direccion: string;
    ubigeo: Ubigeo;
    correo: string;
    ocupacion: string;
    numeroContacto: string;
    carreraProfesion: string;
    organizacionRefiere: string;
    vinculoNic: 'SV' | 'VL' | 'PR' | 'GS';

    // Atención
    modalidad: 'P' | 'V';
    motivoConsulta: string;
    horarioDisponibilidad: 'M' | 'T';
    observacion: string;
    terminoAtenciones: boolean;
    servicio: DTOServicioCombo;
    ambiente: DTOAmbienteCombo;


    // Socioeconómico
    tipoVivienda: string;
    habitacionesCamas: string;
    serviciosBasicos: string[];
    gastosMensuales: string;
    cantidadFamiliares: string;
    tipoSeguro: string;
    categorizacionSocioeconomica: string;

    //Familiar
    contactoEmergencia: string;
    parentezco: string;
    numeroEmergencia: string;
    enfermedadesDelLosFamiliares: string;
}

export interface DTOPacienteListar {
    id: number;
    nombresCompletos: string;
    fechaNacimiento: string;
    nacionalidad: string;
    sexo: string;
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