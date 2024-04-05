import { DTOArchivo } from "src/app/shared/models/shared.models";

export interface DTOAtencionHistoriaItem {
    fechaHora: string;
    ambiente: string;
    estadoPago: string;
    informe: DTOAtencionHistoriaItemInforme;
    archivosAdjuntos: DTOArchivo[];
}

export interface DTOAtencionHistoriaItemInforme {
    id: number;
    observacionConducta: string;
    analisisIntervencion: string;
    conclusiones: string;
    recomendaciones: string;
}

export interface DTOAtencionListar {
    id: number;
    paciente: string;
    psicologo: string;
    fechaHora: string;
    ambiente: string;
    estado: string;
}