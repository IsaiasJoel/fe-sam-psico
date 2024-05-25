import { ChangeDetectorRef, Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DTOPacienteListar } from '../paciente/paciente.models';
import { PacienteService } from '../paciente/paciente.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'mis-pacientes',
  templateUrl: './mis-pacientes.component.html'
})
export class MisPacientesComponent {
//========================================================================================
  // Variables
  //========================================================================================
  // @ViewChild(MatPaginator) _paginator: MatPaginator;
  // @ViewChild(MatSort) _sort: MatSort;

  columnas: string[] = ['nombresApellidos', 'edad', 'nacionalidad', 'sexo', 'verHistoria'];
  dataSource: MatTableDataSource<DTOPacienteListar>;
  // pagination = { numeroPagina: 0, tamanioPagina: 10, tamanioTotal: 0, index: 0 };
  // pageableOptions = [10, 25, 100];

  //========================================================================================
  // Ciclo de vida
  //========================================================================================
  constructor(
    private _pacienteService: PacienteService,
    // private _router: Router,
    private _changeDetectorRef: ChangeDetectorRef
    // private _paisService: PaisService
  ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource([]);
  }

  ngAfterViewInit() {
    //debe estar aquí porque en este punto ya cargó el MatPaginator, de lo contrario es undefined
    // this._suscribirseAlPaginator();
    this._listar();
  }

  //========================================================================================
  // Métodos privados
  //========================================================================================
  private async _listar() {
    const http$ = this._pacienteService.listarTodos$();
    const respServidor = await lastValueFrom(http$);
    this._cargarDatosDelServidorAlDatasource(respServidor);
  }

  /**almacenar la respuesta del servidor en variables locales*/
  private _cargarDatosDelServidorAlDatasource(data: any): void {
    //setear data source
    this.dataSource = null;
    this.dataSource = new MatTableDataSource(data)
    // this.dataSource.sort = this._sort;

    // //actualizar paginación
    // this.pagination.tamanioTotal = data.totalElements;
    // this.pagination.tamanioPagina = data.size;
    // this.pagination.index = data.number;
    this._changeDetectorRef.markForCheck();
  }

  // private _suscribirseAlPaginator() {
  //   if (this._paginator != undefined && this._paginator != null) {
  //     // Obtener nuevamente los resultados si la paginación cambia de alguna manera
  //     this._paginator.page.pipe(
  //       switchMap((event) => {
  //         this.pagination.tamanioTotal = event.length;
  //         return this._pacienteService.listarTodos$(this._paginator?.pageIndex, this._paginator?.pageSize);
  //       }),
  //       map((respuestaServidor) => {
  //         this._cargarDatosDelServidorAlDatasource(respuestaServidor.content);
  //       })
  //     ).subscribe();
  //   }
  // }

  //========================================================================================
  // Métodos públicos
  //========================================================================================
}
