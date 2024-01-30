import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PacienteComponent } from './paciente.component';
import { Route, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/core/modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { SharedModule } from 'src/app/shared/shared.module';
import { CrearPacienteComponent } from './crear-paciente/crear-paciente.component';
import { EditarPacienteComponent } from './editar-paciente/editar-paciente.component';

const routes: Route[] = [
  { path: '', component: PacienteComponent },
  { path: 'crear', component: CrearPacienteComponent },
  { path: ':id', component: EditarPacienteComponent },
];

@NgModule({
  declarations: [
    PacienteComponent,
    CrearPacienteComponent,
    EditarPacienteComponent
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
