import { Cie, CodigoAlerta, DTOSexoCombo, Pais, Ubigeo } from "src/app/shared/models/shared.models";
import { DTOPsicologoCombo } from "../psicologo/psicologo.models";
import { DTOAtencionHistoriaItem } from "../atencion/atencion.models";

export interface DTOPacienteCrearEditarRequest {
    id: number;
    apPaterno: string;
    apMaterno: string;
    nombres: string;
    docIdentidad: string;
    sexo: DTOSexoCombo;
    fecNacimiento: string; //fecha
    pais:Pais;
    lugarNacimiento: string;
    direccion: string;
    ubigeo:Ubigeo;
    correo: string;
    ocupacion: string;
    carreraProfesion: string;
    numeroContacto: string;
    contactoEmergencia: string;
    organizacionRefiere: string;
    motivoConsulta: string;
    horarioDisponibilidad: string;
    observacion: string;
    habilitado: boolean;
    terminoAtenciones: boolean;
}

// export interface DTOPacienteEncontrado {
//     id: number;

//     //Datos personales
//     apPaterno: string;
//     apMaterno: string;
//     nombres: string;
//     fechaNacimiento: string; //fecha
//     dni: string;
//     lugarNacimiento: string;
//     direccion: string;
//     departamento: string;
//     provincia: string;
//     distrito: string;
//     numeroContacto: string;
//     sexo: string;
//     nacionalidad: string;
//     correo: string;
//     carreraOProfesion: string;
//     ocupacion: string;

//     //Nivel socioeconómico
//     tipoVivienda: string;
//     habitacionesOcamas: string;
//     serviciosBasicos: string;
//     gastosMensuales: string;
//     informacionGastoFamiliar: string;
//     tipoDeSeguro: string;
//     categorizacionSocioeconomica: string;

//     //Familiar
//     contactoEmergencia: string;
//     parentezcoContactoEmergencia: string;
//     numeroContactoEmergencia: string;

//     habilitado: boolean;
// }

export interface DTOPacienteListar {
    id: number;
    apPaterno: string;
    apMaterno: string;
    nombres: string;
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