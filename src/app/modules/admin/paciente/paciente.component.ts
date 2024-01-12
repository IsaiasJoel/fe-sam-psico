import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Observable, lastValueFrom, map, switchMap } from 'rxjs';
import { SweetAlertService } from 'src/app/core/modals/sweet-alert.service';
import { ApiResponse } from 'src/app/core/models/api-response.interface';
import { TEXTO_CONSULTA_EXITOSA, TEXTO_CONSULTA_FALLO } from 'src/app/core/utils/constants.utils';
import { PacienteService } from './paciente.service';
import { NACIONALIDADES } from 'src/app/shared/data/shared.data';
import { ModalCrearPacienteComponent } from './modal-crear-paciente/modal-crear-paciente.component';
import { ModalEditarPacienteComponent } from './modal-editar-paciente/modal-editar-paciente.component';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html'
})
export class PacienteComponent {
  @ViewChild(MatPaginator) _paginator: MatPaginator;
  @ViewChild(MatSort) _sort: MatSort;

  // ,'eliminar'
  columnas: string[] = ['nombresApellidos', 'dni', 'edad', 'nacionalidad', 'sexo', 'celular', 'editar'];
  dataSource: MatTableDataSource<any>;
  estaCargando: boolean = true;

  filtroDni: string;
  filtroNombres: string;
  filtroNacionalidad: boolean | string; //es string en caso no se seleccione nada

  pagination = { numeroPagina: 0, tamanioPagina: 10, tamanioTotal: 0, index: 0 };
  pageableOptions = [10, 25, 100];

  nacionalidades: string[] = NACIONALIDADES;

  //===================================================
  // Ciclo de vida
  //===================================================
  constructor(
    private _pacienteService: PacienteService,
    private _matDialog: MatDialog,
    private _toastr: ToastrService,
    private _sweetAlertService: SweetAlertService
  ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit(): void {
    this._iniciarFiltros();
  }

  ngAfterViewInit() {
    //debe estar aquí porque en este punto ya cargó el MatPaginator, de lo contrario es undefined
    this._suscribirseAlPaginator();
    this._listar();
  }

  //=====================================
  // Métodos privados
  //=====================================
  private async _listar() {
    this.estaCargando = true;

    try {
      const http$: Observable<ApiResponse> = this._pacienteService.listarPaginacion$(this._paginator?.pageIndex, this._paginator?.pageSize, this.filtroDni, this.filtroNombres);
      const respServidor: ApiResponse = await lastValueFrom(http$);
      this._cargarDatosDelServidorAlDatasource(respServidor.data);
      this._toastr.success(TEXTO_CONSULTA_EXITOSA);
    } catch (error) {
      this._toastr.error(TEXTO_CONSULTA_FALLO);
    } finally {
      this.estaCargando = false;
    }
  }

  private _iniciarFiltros() {
    this.filtroNacionalidad = 'xxx';
  }

  /**almacenar la respuesta del servidor en variables locales*/
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

  private _suscribirseAlPaginator() {
    if (this._paginator != undefined && this._paginator != null) {
      // Obtener nuevamente los resultados si la paginación cambia de alguna manera
      this._paginator.page.pipe(
        switchMap((event) => {
          this.pagination.tamanioTotal = event.length;
          this.estaCargando = true;
          return this._pacienteService.listarPaginacion$(this._paginator?.pageIndex, this._paginator?.pageSize);
        }),
        map((respuestaServidor) => {
          this._cargarDatosDelServidorAlDatasource(respuestaServidor.data);
          this.estaCargando = false;
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

  //=====================================
  // Modales
  //=====================================
  abrirModalCrearPaciente() {
    const ref = this._matDialog.open(ModalCrearPacienteComponent);
    ref.afterClosed().subscribe(respuestaModal => {
      if (respuestaModal == 'OK') {
        this._toastr.success('Se agregó correctamente');
        this._listar();
      }
    });
  }

  abrirModalEditarPaciente(pIdPaciente: string) {
    const ref = this._matDialog.open(ModalEditarPacienteComponent,
      {
        data: {
          idPaciente: pIdPaciente
        },
        width: '100%'
      });

    ref.afterClosed().subscribe(respuestaModal => {
      if (respuestaModal == 'OK') {
        this._toastr.success('El usuario fue editado correctamente');
        this._listar();
      }
    });
  }

}
