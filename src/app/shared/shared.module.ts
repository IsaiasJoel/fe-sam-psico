import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioNombresCompletosPipe } from './pipes/usuario-nombres-completos.pipe';
import { UsuarioEdadPipe } from './pipes/usuario-edad.pipe';



@NgModule({
  declarations: [
    UsuarioNombresCompletosPipe,
    UsuarioEdadPipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    UsuarioNombresCompletosPipe,
    UsuarioEdadPipe,
  ]
})
export class SharedModule { }
