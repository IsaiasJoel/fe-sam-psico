import { DTOSexoCombo, Pais } from "src/app/shared/models/shared.models";
import { DTOMenuNavegacion } from "../menu/menu.model";
import { DTOPsicologoCrearEditarRequest } from "../psicologo/psicologo.models";

export interface DTOUsuarioSesion {
    id: number;
    nombres: string;
    apPaterno: string;
    apMaterno: string;
    username: string;
    habilitado: boolean;
    esSuperUsuario: boolean;
    dni: string;
    menues: DTOMenuNavegacion[];
}

export interface DTOUsuarioListar {
    id: number;
    nombresCompletos: string;
    activo: boolean;
    tipo: string;
}

export interface DTOUsuarioCrearActualizar {
    id: number;
    dni: string;
    nombres: string;
    apPaterno: string;
    apMaterno: string;
    fecNacimiento: string;
    sexo: DTOSexoCombo;
    pais: Pais;
    celular: string;
    carreraProfesional: string;
    username: string;
    esPsicologo: boolean;
    habilitado: boolean;
    roles: number[];
    psicologo: DTOPsicologoCrearEditarRequest;
}