export interface DTOServicioCrearEditarRequest {
    id: number;
    nombre: string;
    costo: number;
    habilitado: boolean;
}

export interface DTOServicioListar {
    codigo: string;
    nombre: string;
    costo: number;
    imagen: string;
    habilitado: boolean;
}

export interface DTOServicioCombo {
    codigo: string;
    nombre: string;
    costo: number;
}