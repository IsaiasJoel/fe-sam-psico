import { Pipe, PipeTransform } from '@angular/core';
import { DTOPsicologoEncontrado, DTOPsicologoListar } from 'src/app/modules/admin/psicologo/psicologo.models';

@Pipe({
  name: 'psicologoNombresCompletos'
})
export class PsicologoNombresCompletosPipe implements PipeTransform {

  transform(voluntario: DTOPsicologoListar | DTOPsicologoEncontrado): unknown {
    if (!voluntario) return "SIN DATOS";
    return `${voluntario.nombres} ${voluntario.apPaterno} ${voluntario.apMaterno}`;
  }

}
