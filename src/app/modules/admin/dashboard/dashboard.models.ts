import { ApexAxisChartSeries, ApexNonAxisChartSeries } from "ng-apexcharts";

export interface DTODataDashboard {
    resumenAtenciones: DTODashboardResumenAtencion[];
    casosAtendidos: DTODashboardCasosAtendidos;
    recaudacion: DTODashboardRecaudacion;
    rangoEdades: DTODashboardRangoEdades;
    proximasAtenciones: DTODashboardProximasAtenciones[];
    comparacionMayoriaEdad: DTODashboardRangoComparacionEdades;
    comparacionDiagnosticoPreventivo: DTODashboardComparacionDiagnosticoPreventivo;
    comparacionNacionalidad: DTODashboardComparacionNacionalidad;
}

export interface DTODashboardRangoComparacionEdades {
    labels: string[];
    series: ApexNonAxisChartSeries;
}

export interface DTODashboardComparacionDiagnosticoPreventivo {
    labels: string[];
    series: ApexNonAxisChartSeries;
}

export interface DTODashboardComparacionNacionalidad {
    labels: string[];
    series: ApexNonAxisChartSeries;
}

export interface DTODashboardResumenAtencion {
    titulo: string;
    valor: number;
    claseColor: string;
}

export interface DTODashboardCasosAtendidos {
    labels: string[];
    series: ApexAxisChartSeries;
}

export interface DTODashboardRecaudacion {
    totalRecaudado: number;
    totalAtenciones: number;
    atencionesPagadas: number;
    atencionesPendientesPago: number;
    atencionesSinPagar: number;
}

export interface DTODashboardRangoEdades {
    labels: string[];
    series: ApexNonAxisChartSeries;
}

export interface DTODashboardProximasAtenciones {
    paciente: string;
    psicologo: string;
    hora: string;
    fecha: string;
    ambiente: string;
}