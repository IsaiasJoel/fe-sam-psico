import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioComponent } from './usuario.component';
import { MaterialModule } from 'src/app/core/modules/material/material.module';
import { Route, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Route[] = [
  // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '', component: UsuarioComponent },
  // { path: 'crear', component: CrearPsicologoComponent },
  // { path: ':id', component: EditarPsicologoComponent },
  // { path: ':id/casos-asignados', component: CasosAsignadosPorPsicologoComponent },
];

@NgModule({
  declarations: [
    UsuarioComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class UsuarioModule { }
