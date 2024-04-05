import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolComponent } from './rol.component';
import { Route, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/core/modules/material/material.module';

const routes: Route[] = [
  // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '', component: RolComponent },
];

@NgModule({
  declarations: [
    RolComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes)
  ]
})
export class RolModule { }
