export interface DTOMenuNavegacion {
    id?: number;
    nombre?: string;
    orden?: number;
    tipo: 'basico' | 'colapsable' | 'grupo';
    idPadre?: number;
    icono?: string;
    url?: string;
    estaOculto?: boolean;
    hijos?: DTOMenuNavegacion[];
}

export interface DTOMenuMatchPorCodigoRol {
    codigo: string;
    codigoPadre: string;
    nombre: string;
    tipo: string;
    orden: number;
    tienePermiso: boolean;
    hijos: DTOMenuMatchPorCodigoRol[];
}

export interface DTOMenuRolGuardarRequest {
    idRol: string;
    idMenues: string[]; //lista de id de menues
}