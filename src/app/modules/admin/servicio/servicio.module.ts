import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicioComponent } from './servicio.component';
import { Route, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/core/modules/material/material.module';

const routes: Route[] = [
  // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '', component: ServicioComponent },
];

@NgModule({
  declarations: [
    ServicioComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class ServicioModule { }
