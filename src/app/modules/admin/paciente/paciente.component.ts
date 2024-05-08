import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, lastValueFrom, map, switchMap } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response.interface';
import { PacienteService } from './paciente.service';
import { Router } from '@angular/router';
import { DTOPacienteListar } from './paciente.models';
import { PaisService } from 'src/app/shared/services/pais.service';
import { Pais } from 'src/app/shared/models/shared.models';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PacienteComponent {
  @ViewChild(MatPaginator) _paginator: MatPaginator;
  @ViewChild(MatSort) _sort: MatSort;

  columnas: string[] = ['nombresApellidos', 'dni', 'edad', 'nacionalidad', 'sexo', 'celular', 'horarioDisponibilidad', 'verHistoria', 'editar'];
  dataSource: MatTableDataSource<DTOPacienteListar>;

  filtroDni: string;
  filtroNombres: string;
  filtroNacionalidad: Pais; //es string en caso no se seleccione nada
  filtroEstado: string = 'Seleccione'; //es string en caso no se seleccione nada

  pagination = { numeroPagina: 0, tamanioPagina: 10, tamanioTotal: 0, index: 0 };
  pageableOptions = [10, 25, 100];

  nacionalidades: Pais[] = [];
  listaPacientes: DTOPacienteListar[] = [];

  //===================================================
  // Ciclo de vida
  //===================================================
  constructor(
    private _pacienteService: PacienteService,
    private _router: Router,
    private _changeDetectorRef: ChangeDetectorRef,
    private _paisService: PaisService
  ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit(): void {
    this._obtenerPaises();
  }

  ngAfterViewInit() {
    //debe estar aquí porque en este punto ya cargó el MatPaginator, de lo contrario es undefined
    this._suscribirseAlPaginator();
    this._listar();
    this.dataSource = new MatTableDataSource(this.listaPacientes);
  }

  //=====================================
  // Métodos privados
  //=====================================
  private async _listar() {
    const http$: Observable<ApiResponse> = this._pacienteService.listarPaginacion$(this._paginator?.pageIndex, this._paginator?.pageSize, this.filtroDni, this.filtroNombres);
    const respServidor: ApiResponse = await lastValueFrom(http$);
    this._cargarDatosDelServidorAlDatasource(respServidor.data);
  }

  private async _obtenerPaises() {
    const http$ = this._paisService.paises$();
    this.nacionalidades = await lastValueFrom(http$);
    this.filtroNacionalidad = this.nacionalidades.find(pais => pais.iso == 'PE');
    this._changeDetectorRef.markForCheck();
  }

  /**almacenar la respuesta del servidor en variables locales*/
  private _cargarDatosDelServidorAlDatasource(data: any): void {
    //setear data source
    this.dataSource = null;
    this.dataSource = new MatTableDataSource(data.content)
    this.dataSource.sort = this._sort;

    //actualizar paginación
    this.pagination.tamanioTotal = data.totalElements;
    this.pagination.tamanioPagina = data.size;
    this.pagination.index = data.number;
    this._changeDetectorRef.markForCheck();
  }

  private _suscribirseAlPaginator() {
    if (this._paginator != undefined && this._paginator != null) {
      // Obtener nuevamente los resultados si la paginación cambia de alguna manera
      this._paginator.page.pipe(
        switchMap((event) => {
          this.pagination.tamanioTotal = event.length;
          return this._pacienteService.listarPaginacion$(this._paginator?.pageIndex, this._paginator?.pageSize);
        }),
        map((respuestaServidor) => {
          this._cargarDatosDelServidorAlDatasource(respuestaServidor.data);
        })
      ).subscribe();
    }
  }

  //=====================================
  // Métodos públicos
  //=====================================
  filtrar(event: KeyboardEvent) {
    if (event.key != 'Enter') return;
    this._listar();
    if (!this.dataSource.paginator) return;
    this.dataSource.paginator.firstPage();
  }

  clickFiltrar() {
    this._listar();
  }

  teclaEnterFiltrar(e: KeyboardEvent) {
    if (e.key != 'Enter') return;
    this._listar();
  }

  cambiarFiltroNacionalidad(item) {
    this.filtroNacionalidad = item;
    this._listar();
  }

  irAPantallaCrear() {
    this._router.navigate(['/pacientes/crear']);
  }

  irAPantallEditar(id: number) {
    this._router.navigate(['/pacientes/', id]);
  }

  verHistoria(id: number) {
    this._router.navigate(['/pacientes/historias/', id]);
  }

  //=====================================
  // Modales
  //=====================================

}
