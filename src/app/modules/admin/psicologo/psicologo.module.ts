import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PsicologoComponent } from './psicologo.component';
import { Route, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/core/modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from "ngx-mask";
import { SharedModule } from 'src/app/shared/shared.module';
import { CrearPsicologoComponent } from './crear-psicologo/crear-psicologo.component';
import { EditarPsicologoComponent } from './editar-psicologo/editar-psicologo.component';
import { ModalVerPsicologoComponent } from './modal-ver-psicologo/modal-ver-psicologo.component';
import { ModalPsicologoHorarioAtencionComponent } from './modal-psicologo-horario-atencion/modal-psicologo-horario-atencion.component';
import { CasosAsignadosPorPsicologoComponent } from './casos-asignados-por-psicologo/casos-asignados-por-psicologo.component';
import { ModalAtencionesCanceladasComponent } from './casos-asignados-por-psicologo/modal-atenciones-canceladas/modal-atenciones-canceladas.component';

const routes: Route[] = [
  // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '', component: PsicologoComponent },
  { path: 'crear', component: CrearPsicologoComponent },
  { path: ':id', component: EditarPsicologoComponent },
  { path: ':id/pacientes-asignados', component: CasosAsignadosPorPsicologoComponent },
];

@NgModule({
  declarations: [
    PsicologoComponent,
    CrearPsicologoComponent,
    EditarPsicologoComponent,
    ModalVerPsicologoComponent,
    ModalPsicologoHorarioAtencionComponent,
    CasosAsignadosPorPsicologoComponent,
    ModalAtencionesCanceladasComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ReactiveFormsModule,

    NgxMaskModule.forChild(),
    SharedModule
  ]
})
export class PsicologoModule { }
