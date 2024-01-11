import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtencionComponent } from './atencion.component';
import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
  { path: '', component: AtencionComponent },
];

@NgModule({
  declarations: [
    AtencionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AtencionModule { }
