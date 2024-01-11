import { Pipe, PipeTransform } from '@angular/core';
import { DTOUsuarioListar } from 'src/app/modules/admin/usuario/usuario.models';

@Pipe({
  name: 'usuarioNombresCompletos'
})
export class UsuarioNombresCompletosPipe implements PipeTransform {

  transform(voluntario: DTOUsuarioListar): unknown {
    if (!voluntario) return "SIN DATOS";
    return `${voluntario.nombres} ${voluntario.apPaterno} ${voluntario.apMaterno}`;
  }

}
