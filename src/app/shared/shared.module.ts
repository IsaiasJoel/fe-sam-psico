import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PsicologoNombresCompletosPipe } from './pipes/psicologo-nombres-completos.pipe';
import { EdadPipe } from './pipes/edad.pipe';
import { LoaderComponent } from './components/loader/loader.component';
import { MaterialModule } from '../core/modules/material/material.module';
import { CampoVacioPipe } from './pipes/campo-vacio.pipe';



@NgModule({
  declarations: [
    PsicologoNombresCompletosPipe,
    EdadPipe,
    LoaderComponent,
    CampoVacioPipe,
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    PsicologoNombresCompletosPipe,
    EdadPipe,
    CampoVacioPipe,
    LoaderComponent
  ]
})
export class SharedModule { }
