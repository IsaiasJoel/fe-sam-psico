import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmbienteComponent } from './ambiente.component';
import { Route, RouterModule } from '@angular/router';
import { ModalCrearAmbienteComponent } from './modal-crear-ambiente/modal-crear-ambiente.component';
import { ModalEditarAmbienteComponent } from './modal-editar-ambiente/modal-editar-ambiente.component';
import { MaterialModule } from 'src/app/core/modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';

const routes: Route[] = [
  { path: '', component: AmbienteComponent },
];

@NgModule({
  declarations: [
    AmbienteComponent,
    ModalCrearAmbienteComponent,
    ModalEditarAmbienteComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgxMaskModule.forChild(),
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AmbienteModule { }
