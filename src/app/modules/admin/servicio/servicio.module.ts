import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicioComponent } from './servicio.component';
import { Route, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/core/modules/material/material.module';
import { ModalCrearServicioComponent } from './modal-crear-servicio/modal-crear-servicio.component';
import { ModalEditarServicioComponent } from './modal-editar-servicio/modal-editar-servicio.component';
import { NgxMaskModule } from 'ngx-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Route[] = [
  // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '', component: ServicioComponent },
];

@NgModule({
  declarations: [
    ServicioComponent,
    ModalCrearServicioComponent,
    ModalEditarServicioComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    NgxMaskModule.forChild(),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ServicioModule { }
