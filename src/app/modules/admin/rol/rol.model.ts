export interface DTORolMatchPorCodigoUsuario {
    idRol: string;
    nombreRol: string;
    match: string;
}

export interface DTORolSimple {
    id: string;
    nombre: string;
    estado: string;
}

export interface DTORolListar {
    id: number;
    nombre: string;
}

export interface DTOUsuarioRolGuardarRequest {
    idUsuario: string;
    idRoles: string[]; //lista de codigos de roles
}
