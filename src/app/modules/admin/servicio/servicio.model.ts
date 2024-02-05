export interface DTOServicioCrearEditarRequest {
    id: number;
    descripcion: string;
    costo: number;
    habilitado: boolean;
}

export interface DTOServicioListar {
    id: number;
    descripcion: string;
    costo: number;
    habilitado: boolean;
}