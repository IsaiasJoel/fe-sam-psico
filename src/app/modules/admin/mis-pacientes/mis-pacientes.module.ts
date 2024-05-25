import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MisPacientesComponent } from './mis-pacientes.component';
import { MaterialModule } from 'src/app/core/modules/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { Route, RouterModule } from '@angular/router';
import { HistoriaClinicaMiPacienteComponent } from './historia-clinica-mi-paciente/historia-clinica-mi-paciente.component';

const routes: Route[] = [
  { path: '', component: MisPacientesComponent },
  { path: ':id/historias', component: HistoriaClinicaMiPacienteComponent },
];

@NgModule({
  declarations: [
    MisPacientesComponent,
    HistoriaClinicaMiPacienteComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class MisPacientesModule { }
