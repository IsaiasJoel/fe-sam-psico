import { ApexOptions } from "ng-apexcharts";

export const colorBorder: string = "#e2e8f0";
export const textoSecundario: string = "#64748b";

export function configTorta(labels: any, series: any) {
    return {
        chart: {
            fontFamily: 'inherit',
            foreColor: 'inherit',
            height: '100%',
            type: 'pie',
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        labels: labels,
        legend: {
            position: 'left'
        },
        plotOptions: {
            polarArea: {
                spokes: {
                    connectorColors: colorBorder
                },
                rings: {
                    strokeColor: colorBorder
                }
            }
        },
        series: series,
        states: {
            hover: {
                filter: {
                    type: 'darken',
                    value: 0.75
                }
            }
        },
        stroke: {
            width: 2
        },
        theme: {
            monochrome: {
                enabled: true,
                color: '#93C5FD',
                shadeIntensity: 0.75,
                shadeTo: 'dark'
            }
        },
        tooltip: {
            followCursor: true,
            theme: 'dark'
        },
        yaxis: {
            labels: {
                style: {
                    colors: textoSecundario
                }
            }
        }
    }
}

export function configPuntos(labels: any, series: any): ApexOptions {
    return {
        chart: {
            fontFamily: 'inherit',
            foreColor: 'inherit',
            height: '100%',
            type: 'line',
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        colors: ['#64748B', '#94A3B8'],
        dataLabels: {
            enabled: true,
            enabledOnSeries: [0],
            background: {
                borderWidth: 0
            }
        },
        grid: {
            borderColor: colorBorder
        },
        labels: labels,
        legend: {
            show: false
        },
        plotOptions: {
            bar: {
                columnWidth: '50%'
            }
        },
        series: series,
        states: {
            hover: {
                filter: {
                    type: 'darken',
                    value: 0.75
                }
            }
        },
        stroke: {
            width: [3, 0]
        },
        tooltip: {
            followCursor: true,
            theme: 'dark'
        },
        xaxis: {
            axisBorder: {
                show: false
            },
            axisTicks: {
                color: colorBorder
            },
            labels: {
                style: {
                    colors: textoSecundario
                }
            },
            tooltip: {
                enabled: false
            }
        },
        yaxis: {
            labels: {
                offsetX: -16,
                style: {
                    colors: textoSecundario
                }
            }
        }
    };
}