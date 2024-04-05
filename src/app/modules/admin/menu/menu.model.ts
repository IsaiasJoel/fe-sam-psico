export interface DTOMenuNavegacion {
    id?: number;
    nombre?: string;
    orden?: number;
    tipo: 'basico' | 'colapsable';
    idPadre?: number;
    icono?: string;
    url?: string;
    estaOculto?: boolean;
    hijos?: DTOMenuNavegacion[];
}

export interface DTOMenuMatchPorIdRol {
    idMenu: string;
    idMenuPadre: string;
    menuNombre: string;
    menuOrden: number;
    rolTieneMenu: string;
    menuesHijos: DTOMenuMatchPorIdRol[];
}

export interface DTOMenuRolGuardarRequest {
    idRol: string;
    idMenues: string[]; //lista de id de menues
}