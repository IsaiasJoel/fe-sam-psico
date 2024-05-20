import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'campoVacio'
})
export class CampoVacioPipe implements PipeTransform {

  transform(value: string | number): any {
    return value ?? 'NO ESPECIFICA';
  }

}
