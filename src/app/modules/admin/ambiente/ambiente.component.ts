import { Component } from '@angular/core';
import { AmbienteService } from './ambiente.service';
import { ToastrService } from 'ngx-toastr';
import { SweetAlertService } from 'src/app/core/modals/sweet-alert.service';
import { MatDialog } from '@angular/material/dialog';
import { DTOAmbienteListar } from './ambiente.model';
import { lastValueFrom } from 'rxjs';
import { ModalCrearAmbienteComponent } from './modal-crear-ambiente/modal-crear-ambiente.component';
import { CONSULTA_CORRECTA } from 'src/app/shared/data/shared.data';
import { ModalEditarAmbienteComponent } from './modal-editar-ambiente/modal-editar-ambiente.component';

@Component({
  selector: 'app-ambiente',
  templateUrl: './ambiente.component.html'
})
export class AmbienteComponent {
  ambientes: DTOAmbienteListar[] = [
    {
      id: 1,
      nombre: 'Salón principal',
      ubicacion: 'Planta baja',
      aforo: 100,
      disponible: true,
      descripcion: 'Espacioso salón para eventos',
      habilitado: true,
      imagen: 'https://www.equipamientointegraldeoficinas.com/wp-content/uploads/mamparas-de-oficina-principal.jpg'
    },
    {
      id: 2,
      nombre: 'Terraza',
      ubicacion: 'Piso 2',
      aforo: 50,
      disponible: true,
      descripcion: 'Terraza al aire libre con vista panorámica',
      habilitado: true,
      imagen: 'https://www.equipamientointegraldeoficinas.com/wp-content/uploads/imagen-destacada-25.jpg'
    },
    {
      id: 3,
      nombre: 'Sala de conferencias',
      ubicacion: 'Piso 3',
      aforo: 80,
      disponible: true,
      descripcion: 'Sala equipada para conferencias y presentaciones',
      habilitado: true,
      imagen: 'https://www.equipamientointegraldeoficinas.com/wp-content/uploads/despachos-3.jpg'
    },
    {
      id: 4,
      nombre: 'Sala de reuniones',
      ubicacion: 'Piso 1',
      aforo: 20,
      disponible: true,
      descripcion: 'Sala para reuniones ejecutivas',
      habilitado: true,
      imagen: 'https://www.equipamientointegraldeoficinas.com/wp-content/uploads/RECEPCION-DE-OFICINA-M10.jpg'
    },
    {
      id: 5,
      nombre: 'Salón de eventos',
      ubicacion: 'Planta baja',
      aforo: 150,
      disponible: true,
      descripcion: 'Amplio salón para eventos sociales',
      habilitado: true,
      imagen: 'https://cdn.shopify.com/s/files/1/0548/8551/5434/files/portada_facebook_copy_2048x2048.jpg'
    },
    {
      id: 6,
      nombre: 'Aula de capacitación',
      ubicacion: 'Piso 2',
      aforo: 30,
      disponible: false,
      descripcion: 'Aula para capacitaciones y talleres',
      habilitado: true,
      imagen: 'https://www.elpsicotaller.net/psicotaller/wp-content/themes/El_Psicotaller_2019_1-3/img/01_consultorio_01.png'
    },
    {
      id: 7,
      nombre: 'Sala de exposiciones',
      ubicacion: 'Piso 3',
      aforo: 60,
      disponible: true,
      descripcion: 'Espacio para exposiciones de arte y cultura',
      habilitado: true,
      imagen: 'https://www.equipamientointegraldeoficinas.com/wp-content/uploads/RECEPCION-DE-OFICINA-M10.jpg'
    },
    {
      id: 8,
      nombre: 'Sala de espera',
      ubicacion: 'Piso 1',
      aforo: 40,
      disponible: true,
      descripcion: 'Cómoda sala de espera para clientes',
      habilitado: true,
      imagen: 'https://cdn.shopify.com/s/files/1/0548/8551/5434/files/portada_facebook_copy_2048x2048.jpg'
    },
    {
      id: 9,
      nombre: 'Cafetería',
      ubicacion: 'Planta baja',
      aforo: 50,
      disponible: false,
      descripcion: 'Cafetería con variedad de productos',
      habilitado: true,
      imagen: 'https://www.equipamientointegraldeoficinas.com/wp-content/uploads/RECEPCION-DE-OFICINA-M10.jpg'
    },
    {
      id: 10,
      nombre: 'Sala de descanso',
      ubicacion: 'Piso 2',
      aforo: 20,
      disponible: false,
      descripcion: 'Sala de descanso para empleados',
      habilitado: true,
      imagen: 'https://www.elpsicotaller.net/psicotaller/wp-content/themes/El_Psicotaller_2019_1-3/img/01_consultorio_01.png'
    }
  ];

  //===================================================
  // Ciclo de vida
  //===================================================
  constructor(
    private _ambienteService: AmbienteService,
    private _toastr: ToastrService,
    private _sweetAlertService: SweetAlertService,
    private _matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this._listar();
  }

  //===================================================
  // Métodos privados
  //===================================================
  private async _listar() {
    // try {
    //   const http$: Observable<ApiResponse> = this._ambienteService.listar$();
    //   const respServidor: ApiResponse = await lastValueFrom(http$);
    //   this.dataSource = new MatTableDataSource(respServidor.data)
    //   this._toastr.success(TEXTO_CONSULTA_EXITOSA);
    // } catch (error) {
    //   this._toastr.error(TEXTO_CONSULTA_FALLO);
    // } finally {
    //   this.estaCargando = false;
    // }
  }

  //===================================================
  // Métodos públicos
  //===================================================
  abrirModalCrear() {
    const ref = this._matDialog.open(ModalCrearAmbienteComponent,{width:'60%'});
    ref.afterClosed().subscribe(respuestaModal => {
      if (respuestaModal == 'OK') {
        this._listar();
        this._toastr.success(CONSULTA_CORRECTA);
      }
    });
  }

  abrirModalEditar(id: number) {
    const ref = this._matDialog.open(ModalEditarAmbienteComponent, { data: { pId: id } });
    ref.afterClosed().subscribe(respuestaModal => {
      if (respuestaModal == 'OK') {
        this._listar();
      }
    });
  }
}
