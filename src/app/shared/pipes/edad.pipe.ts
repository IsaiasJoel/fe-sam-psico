import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'edad'
})
export class EdadPipe implements PipeTransform {

  transform(fechaNacimiento: string): string {
    const fechaActual = moment(new Date());
    const nacimiento: moment.Moment = moment(new Date(fechaNacimiento));
    const edad: number = fechaActual.diff(nacimiento, 'years');
    return `${edad} años`;
  }

}
