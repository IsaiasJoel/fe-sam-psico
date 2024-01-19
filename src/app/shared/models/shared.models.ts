export interface CriterioBusqueda {
    codigo: string;
    nombre: string;
}

export interface OpcionesComboSexo {
    codigo: string;
    nombre: string;
}

////////////////////////////////////////////////
// Ubigeo
////////////////////////////////////////////////
export interface Ubigeo {
    codigo: string;
    departamento: string;
    provincia: string;
    distrito: string;
    eliminado: boolean;
    habilitado: boolean;
}


export interface DTOBuscarUbigeo {
    codigo: string;
    departamento: string;
    provincia: string;
    distrito: string;
}