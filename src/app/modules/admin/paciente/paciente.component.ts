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
import { Router } from '@angular/router';
import { DTOPacienteListar } from './paciente.models';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html'
})
export class PacienteComponent {
  @ViewChild(MatPaginator) _paginator: MatPaginator;
  @ViewChild(MatSort) _sort: MatSort;

  columnas: string[] = ['nombresApellidos', 'dni', 'edad', 'nacionalidad', 'sexo', 'celular', 'editar', 'verHistoria'];
  dataSource: MatTableDataSource<DTOPacienteListar>;
  estaCargando: boolean = true;

  filtroDni: string;
  filtroNombres: string;
  filtroNacionalidad: string; //es string en caso no se seleccione nada
  filtroEstado: boolean | string; //es string en caso no se seleccione nada

  pagination = { numeroPagina: 0, tamanioPagina: 10, tamanioTotal: 0, index: 0 };
  pageableOptions = [10, 25, 100];

  nacionalidades: string[] = NACIONALIDADES;

  //Mock
  listaPacientes: DTOPacienteListar[] = [
    {
      id: 1,
      apPaterno: 'González',
      apMaterno: 'Pérez',
      nombres: 'Juan',
      nacionalidad: 'PERU',
      fechaNacimiento: '1990-05-15',
      dni: '12345678',
      sexo: 'Masculino',
      numeroContacto: '987654321',
    },
    {
      id: 2,
      apPaterno: 'Rodríguez',
      apMaterno: 'López',
      nombres: 'María',
      nacionalidad: 'VENEZUELA',
      fechaNacimiento: '1985-08-20',
      dni: '87654321',
      sexo: 'Femenino',
      numeroContacto: '123456789',
    },
    {
      id: 3,
      apPaterno: 'Martínez',
      apMaterno: 'Gómez',
      nombres: 'Carlos',
      nacionalidad: 'PERU',
      fechaNacimiento: '1993-11-10',
      dni: '98765432',
      sexo: 'Masculino',
      numeroContacto: '654321987',
    },
    {
      id: 4,
      apPaterno: 'Sánchez',
      apMaterno: 'Fernández',
      nombres: 'Laura',
      nacionalidad: 'PERU',
      fechaNacimiento: '1988-03-25',
      dni: '54321678',
      sexo: 'Femenino',
      numeroContacto: '789654123',
    },
    {
      id: 5,
      apPaterno: 'López',
      apMaterno: 'Hernández',
      nombres: 'Pedro',
      nacionalidad: 'PERU',
      fechaNacimiento: '1995-07-18',
      dni: '87654321',
      sexo: 'Masculino',
      numeroContacto: '321654987',
    },
  ];

  //===================================================
  // Ciclo de vida
  //===================================================
  constructor(
    private _pacienteService: PacienteService,
    private _matDialog: MatDialog,
    private _toastr: ToastrService,
    private _sweetAlertService: SweetAlertService,
    private _router: Router
  ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource([]);
  }

  ngOnInit(): void {
    this._iniciarFiltros();
  }

  ngAfterViewInit() {
    //debe estar aquí porque en este punto ya cargó el MatPaginator, de lo contrario es undefined
    //this._suscribirseAlPaginator();
    //this._listar();
    this.dataSource = new MatTableDataSource(this.listaPacientes)
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
    this.filtroEstado = 'xxx';
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

  cambiarFiltroEstado(item) {
    this.filtroEstado = item;
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
