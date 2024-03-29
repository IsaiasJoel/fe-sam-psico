import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'mis-atenciones',
  templateUrl: './mis-atenciones.component.html'
})
export class MisAtencionesComponent {
  //================================================
  // Variables
  //================================================
  @ViewChild(MatPaginator) _paginator: MatPaginator;
  @ViewChild(MatSort) _sort: MatSort;

  columnas: string[] = ['paciente', /*'psicologx',*/ 'fechaHoraAtencion', 'ambiente', 'estado', 'accion'];
  dataSource: MatTableDataSource<any>;

  pagination = { numeroPagina: 0, tamanioPagina: 10, tamanioTotal: 0, index: 0 };
  pageableOptions = [10, 25, 100];

  filtroEstado: string = 'Todos';
  filtroPacienteDni: string;
  filtroNombresPsicologo: string;
  filtroFechaInicio: string;
  filtroFechaFin: string;

  //================================================
  // Ciclo de vida
  //================================================
  constructor(
    private _router: Router
  ) { }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
  ngAfterViewInit(): void {
    //debe estar aquí porque en este punto ya cargó el MatPaginator, de lo contrario es undefined
    // this._suscribirseAlPaginator();
    this._obtenerData();
    this.dataSource = new MatTableDataSource([
      { paciente: 'Paciente 1', psicologx: 'Psic. 2', fechaHoraAtencion: 'Lunes 3 de abril del 2023', ambiente: 'Sala 1', estado: 'Atendida' },
      { paciente: 'Paciente 2', psicologx: 'Psic. 2', fechaHoraAtencion: 'Lunes 10 de abril del 2023', ambiente: 'Sala 1', estado: 'En espera' },
      { paciente: 'Paciente 3', psicologx: 'Psic. 2', fechaHoraAtencion: 'Lunes 17 de abril del 2023', ambiente: 'Sala 1', estado: 'Cancelada' },
      { paciente: 'Paciente 4', psicologx: 'Psic. 2', fechaHoraAtencion: 'Lunes 24 de abril del 2023', ambiente: 'Sala 1', estado: 'Atendida' }
    ]);
  }



  //================================================
  // Métodos públicos
  //================================================
  private async _obtenerData() {
    // const http$: Observable<ApiResponse> = ;
    // const respServidor: ApiResponse = await lastValueFrom(http$);
    // this._cargarDatosDelServidorAlDatasource(respServidor.data);
  }

  // irAPantallaCrear() {
  //   this._router.navigate(['/atenciones/registrar']);
  // }

  irAPantallEditar(id: number) {
    // this._router.navigate(['/pacientes/', id]);
  }

  clickFiltrar() {
    // this._listar();
  }

  teclaEnterFiltrar(event: KeyboardEvent) {

  }

  cambiarFiltroEstado(item) {
    this.filtroEstado = item;
    this._obtenerData();
  }

  nuevoInformeAtencion() {
    this._router.navigate(["/mis-atenciones/informe"]);
  }

  //================================================
  // Métodos privados
  //================================================
  // private _suscribirseAlPaginator() {
  //   if (this._paginator != undefined && this._paginator != null) {
  //     // Obtener nuevamente los resultados si la paginación cambia de alguna manera
  //     this._paginator.page.pipe(
  //       switchMap((event) => {
  //         this.pagination.tamanioTotal = event.length;
  //         return this._pacienteService.listarPaginacion$(this._paginator?.pageIndex, this._paginator?.pageSize);
  //       }),
  //       map((respuestaServidor) => {
  //         this._cargarDatosDelServidorAlDatasource(respuestaServidor.data);
  //       })
  //     ).subscribe();
  //   }
  // }

  private _cargarDatosDelServidorAlDatasource(data: any): void {
    //setear data source
    this.dataSource = null;
    // this.tieneContenido = (data.content as [])?.length != 0;
    this.dataSource = new MatTableDataSource(data.content)
    this.dataSource.sort = this._sort;

    //actualizar paginación
    this.pagination.tamanioTotal = data.totalElements;
    this.pagination.tamanioPagina = data.size;
    this.pagination.index = data.number;
  }
}
