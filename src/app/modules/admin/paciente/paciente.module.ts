import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacienteComponent } from './paciente.component';
import { Route, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/core/modules/material/material.module';
import { ModalCrearPacienteComponent } from './modal-crear-paciente/modal-crear-paciente.component';
import { ModalEditarPacienteComponent } from './modal-editar-paciente/modal-editar-paciente.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Route[] = [
  // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '', component: PacienteComponent },
];

@NgModule({
  declarations: [
    PacienteComponent,
    ModalCrearPacienteComponent,
    ModalEditarPacienteComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),

    ReactiveFormsModule,

    MaterialModule,
    NgxMaskModule,
    SharedModule
  ]
})
export class PacienteModule { }
