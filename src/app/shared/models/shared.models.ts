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

export interface DTOArchivo {
    codigo: string;
    uuid:string;
    nombre: string;
    rutaBase?: string;
    // tipoArchivo?: TIPO_ARCHIVO;
    extension?: string;
    tamanioMb?: number;
    base64?: string;
    // estado?: string;
    eliminado?: boolean; //Se usa en la operación de editar documento para indicar si será eliminado de la bd o no
}
