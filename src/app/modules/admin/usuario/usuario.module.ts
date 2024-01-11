import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VoluntarioComponent } from './usuario.component';
import { Route, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/core/modules/material/material.module';
import { UsuarioNombresCompletosPipe } from 'src/app/shared/pipes/usuario-nombres-completos.pipe';
import { UsuarioEdadPipe } from 'src/app/shared/pipes/usuario-edad.pipe';
import { ModalCrearUsuarioComponent } from './modal-crear-usuario/modal-crear-usuario.component';
import { ModalEditarUsuarioComponent } from './modal-editar-usuario/modal-editar-usuario.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Route[] = [
  // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '', component: VoluntarioComponent },
];

@NgModule({
  declarations: [
    VoluntarioComponent,
    UsuarioNombresCompletosPipe,
    UsuarioEdadPipe,
    ModalCrearUsuarioComponent,
    ModalEditarUsuarioComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class UsuarioModule { }
