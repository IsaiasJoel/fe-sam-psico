import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PsicologoNombresCompletosPipe } from './pipes/psicologo-nombres-completos.pipe';
import { EdadPipe } from './pipes/psicologo-edad.pipe';



@NgModule({
  declarations: [
    PsicologoNombresCompletosPipe,
    EdadPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PsicologoNombresCompletosPipe,
    EdadPipe,
  ]
})
export class SharedModule { }
