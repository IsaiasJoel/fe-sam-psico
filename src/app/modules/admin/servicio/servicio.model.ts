export interface DTOServicioCrearEditarRequest {
    id: number;
    nombre: string;
    costo: number;
    habilitado: boolean;
}

export interface DTOServicioListar {
    id: number;
    nombre: string;
    costo: number;
    imagen: string;
    habilitado: boolean;
}