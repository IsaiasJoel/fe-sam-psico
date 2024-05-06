import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PsicologoNombresCompletosPipe } from './pipes/psicologo-nombres-completos.pipe';
import { EdadPipe } from './pipes/psicologo-edad.pipe';
import { LoaderComponent } from './components/loader/loader.component';
import { MaterialModule } from '../core/modules/material/material.module';



@NgModule({
  declarations: [
    PsicologoNombresCompletosPipe,
    EdadPipe,
    LoaderComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    PsicologoNombresCompletosPipe,
    EdadPipe,
    LoaderComponent
  ]
})
export class SharedModule { }
