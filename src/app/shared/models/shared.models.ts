export interface CriterioBusqueda {
    codigo: string;
    nombre: string;
}

export interface DTOSexoCombo {
    codigo: string;
    nombre: string;
    habilitado:boolean
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
    id?: string;
    uuid?: string;
    nombre?: string;
    url?: string;
    tipo?: string;
    extension?: string;
    base64?: string;
    // estado?: string;
    eliminado?: boolean; //Se usa en la operación de editar documento para indicar si será eliminado de la bd o no
}

export interface Pais {
    id: number;
    iso: string;
    nombre: string;
}

//=============================================
// Atencion
//=============================================
export interface Cie {
    codigo: string;
    descripcion: string;
}

export interface CodigoAlerta {
    codigo: string;
    nombre: string;
}

export interface Proyecto {
    id: number;
    nombre: string;
}