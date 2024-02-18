import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioComponent } from './usuario.component';
import { Route, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/core/modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from "ngx-mask";
import { SharedModule } from 'src/app/shared/shared.module';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { ModalVerUsuarioComponent } from './modal-ver-usuario/modal-ver-usuario.component';
import { ModalUsuarioHorarioAtencionComponent } from './modal-usuario-horario-atencion/modal-usuario-horario-atencion.component';
import { CasosAsignadosPorUsuarioComponent } from './casos-asignados-por-usuario/casos-asignados-por-usuario.component';
import { ModalAtencionesCanceladasComponent } from './casos-asignados-por-usuario/modal-atenciones-canceladas/modal-atenciones-canceladas.component';

const routes: Route[] = [
  // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '', component: UsuarioComponent },
  { path: 'crear', component: CrearUsuarioComponent },
  { path: ':id', component: EditarUsuarioComponent },
  { path: ':id/casos-asignados', component: CasosAsignadosPorUsuarioComponent },
];

@NgModule({
  declarations: [
    UsuarioComponent,
    EditarUsuarioComponent,
    CrearUsuarioComponent,
    EditarUsuarioComponent,
    ModalVerUsuarioComponent,
    ModalUsuarioHorarioAtencionComponent,
    CasosAsignadosPorUsuarioComponent,
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
export class UsuarioModule { }
