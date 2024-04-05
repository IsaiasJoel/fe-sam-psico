export interface DTOUsuarioSesion {
    id: number;
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    roles: any[];
}

export interface DTOUsuarioListar {
    id: number;
    nombresCompletos: string;
    activo: boolean;
}

export interface DTOUsuarioCrearActualizar {

}