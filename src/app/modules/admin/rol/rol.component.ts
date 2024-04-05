import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RolService } from './rol.service';
import { MatDialog } from '@angular/material/dialog';
import { lastValueFrom, map, switchMap } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response.interface';
import { DTORolListar } from './rol.model';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RolComponent {
  displayedColumns: string[] = ['nombre', 'menues', 'editar'];
  dataSource: MatTableDataSource<DTORolListar>;

  // FILTROS
  filtroNombre: string = '';
  // FIN FILTROS

  // Pagination
  pagination = { numeroPagina: 0, tamanioPagina: 10, tamanioTotal: 0, index: 0 };
  pageableOptions = [10, 25, 100];
  //

  @ViewChild(MatPaginator) _paginator: MatPaginator;
  @ViewChild(MatSort) _sort: MatSort;

  constructor(
    private _rolService: RolService,
    private _dialog: MatDialog
  ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource([
      { id: 1, nombre: 'ADMINISTRADOR' }
    ]);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    //debe estar aquí porque en este punto ya cargó el MatPaginator, de lo contrario es undefined
    this._suscribirseAlPaginator();
    this._obtenerRoles();
  }

  //=====================================
  // Métodos privados
  //=====================================
  private async _obtenerRoles() {
    const http$ = this._rolService.listar$(this._paginator?.pageIndex, this._paginator?.pageSize);
    const respuestaServidor: ApiResponse = await lastValueFrom(http$);
    this._cargarDatosDelServidorAlDatasource(respuestaServidor.data);
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
  }

  private _suscribirseAlPaginator() {
    if (this._paginator != undefined && this._paginator != null) {
      // Obtener nuevamente los resultados si la paginación cambia de alguna manera
      this._paginator.page.pipe(
        switchMap((event) => {
          this.pagination.tamanioTotal = event.length;
          return this._rolService.listar$(this._paginator?.pageIndex, this._paginator?.pageSize);
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
    this.buscar();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

  async buscar() {
    const http$ = this._rolService.listar$(this._paginator?.pageIndex, this._paginator?.pageSize, this.filtroNombre);
    const respuestaServidor: ApiResponse = await lastValueFrom(http$);
    this._cargarDatosDelServidorAlDatasource(respuestaServidor.data);
  }

  limpiarCampos() {
    this.filtroNombre = '';
    this.buscar();
  }

  abrirModalVerMenuesPorRol(pIdRol: string, pNombreRol: string) {
    const ref = this._dialog.open(null,
      {
        width: '40%',
        // height: '100%',
        data: {
          idRol: pIdRol,
          nombreRol: pNombreRol
        }
      });

    ref.afterClosed().subscribe(respuestaModal => {
      if (respuestaModal == 'OK') {
      }
    })
  }

  abrirModalEditarRol(pIdRol: string) {
    const ref = this._dialog.open(null,
      {
        data: {
          idRol: pIdRol
        }
      });

    ref.afterClosed().subscribe(respuestaModal => {
      if (respuestaModal == 'OK') {
        this.buscar();
      }
    });
  }

  abrirModalCrearRol() {
    const ref = this._dialog.open(null);

    ref.afterClosed().subscribe(respuestaModal => {
      if (respuestaModal == 'OK') {
        this.buscar();
      }
    });
  }

}
