import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MisAtencionesComponent } from './mis-atenciones.component';
import { MaterialModule } from 'src/app/core/modules/material/material.module';
import { Route, RouterModule } from '@angular/router';
import { InformeAtencionComponent } from './informe-atencion/informe-atencion.component';

const routes: Route[] = [
  { path: '', component: MisAtencionesComponent },
  { path: 'informe', component: InformeAtencionComponent },
  // { path: ':id', component: EditarPacienteComponent },
  // { path: 'historias/:id', component: HistoriaClinicaPacienteComponent },
];

@NgModule({
  declarations: [
    MisAtencionesComponent,
    InformeAtencionComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MaterialModule
  ]
})
export class MisAtencionesModule { }
