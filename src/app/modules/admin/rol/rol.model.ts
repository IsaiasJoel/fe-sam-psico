// export interface DTORolMatchPorCodigoUsuario {
//     idRol: string;
//     nombreRol: string;
//     match: string;
// }

// export interface DTORolSimple {
//     id: string;
//     nombre: string;
//     estado: string;
// }

export interface DTORolListar {
    id: number;
    nombre: string;
}

export interface DTORolRequestCrearEditar {
    id: number;
    nombre: string;
    habilitado: boolean;
    menues: string[];
}

export interface DTOMenuRolGuardarRequest {
    rolCodigo: string;
    menuesCodigos: string[]; //lista de codigos de menues
}

// export interface DTOUsuarioRolGuardarRequest {
//     idUsuario: string;
//     idRoles: string[]; //lista de codigos de roles
// }
