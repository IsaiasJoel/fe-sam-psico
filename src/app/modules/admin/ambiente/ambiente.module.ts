import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmbienteComponent } from './ambiente.component';
import { Route, RouterModule } from '@angular/router';
import { ModalCrearAmbienteComponent } from './modal-crear-ambiente/modal-crear-ambiente.component';
import { ModalEditarAmbienteComponent } from './modal-editar-ambiente/modal-editar-ambiente.component';

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
    RouterModule.forChild(routes)
  ]
})
export class AmbienteModule { }
