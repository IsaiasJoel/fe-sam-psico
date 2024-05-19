// export interface DTOAmbienteCrearEditarRequest {
//     id: number;
//     nombre: string;
//     ubicacion: string;
//     aforo: number;
//     disponible: boolean;
//     descripcion: string;
//     habilitado: boolean;
// }

export interface DTOAmbienteListar {
    codigo: string;
    nombre: string;
    ubicacion: string;
    aforo: number;
    imagen: string;
    disponible: boolean;
    descripcion: string;
    habilitado: boolean;
}

export interface DTOAmbienteCombo {
    codigo: string;
    nombre: string;
}