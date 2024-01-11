import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { IniciarSesionComponent } from './iniciar-sesion.component';
import { MaterialModule } from 'src/app/core/modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const rutas: Route[] = [
  { path: '', component: IniciarSesionComponent }
];

@NgModule({
  declarations: [
    IniciarSesionComponent
  ],
  imports: [
    RouterModule.forChild(rutas),
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class IniciarSesionModule { }
