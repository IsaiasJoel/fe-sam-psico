import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtencionComponent } from './atencion.component';
import { Route, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/core/modules/material/material.module';
import { RegitrarAtencionComponent } from './regitrar-atencion/regitrar-atencion.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Route[] = [
  { path: '', component: AtencionComponent },
  { path: 'registrar', component: RegitrarAtencionComponent },
];

@NgModule({
  declarations: [
    AtencionComponent,
    RegitrarAtencionComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AtencionModule { }
