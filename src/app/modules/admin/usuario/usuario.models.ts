import { DTOMenuNavegacion } from "../menu/menu.model";

export interface DTOUsuarioSesion {
    id:number;
    nombres:string;
    apPaterno:string;
    apMaterno:string;
    username:string;
    habilitado:boolean;
    esSuperUsuario:boolean;
    dni:string;
    menues:DTOMenuNavegacion[];
}

export interface DTOUsuarioListar {
    id: number;
    nombresCompletos: string;
    activo: boolean;
}

export interface DTOUsuarioCrearActualizar {

}