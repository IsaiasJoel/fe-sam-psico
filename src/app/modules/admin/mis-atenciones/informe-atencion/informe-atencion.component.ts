import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DTOCodigoAlerta } from '../mis-atenciones.models';
import { DTOArchivo } from 'src/app/shared/models/shared.models';

@Component({
  selector: 'informe-atencion',
  templateUrl: './informe-atencion.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InformeAtencionComponent {
  codigosDeAlertaSeleccionados: DTOCodigoAlerta[] = [];
  archivos: DTOArchivo[] = [
    { codigo: '1', uuid: '', nombre: 'Archivo 1' },
    { codigo: '2', uuid: '', nombre: 'Archivo 2' },
    { codigo: '3', uuid: '', nombre: 'Archivo 3' },
    { codigo: '4', uuid: '', nombre: 'Archivo 4' }
  ];

  codigosDeAlerta: DTOCodigoAlerta[] = [
    { codigo: '01', nombre: 'Suicidio' },
    { codigo: '02', nombre: 'Violación sexual' },
    { codigo: '03', nombre: 'Diversidad sexual' },
    { codigo: '04', nombre: 'Xenofobia' },
    { codigo: '04', nombre: 'fsdfdsggfkj' },
    { codigo: '04', nombre: 'fsdfdsggfkj' },
    { codigo: '04', nombre: 'fsdfdsggfkj' },
    { codigo: '04', nombre: 'fsdfdsggfkj' },
    { codigo: '04', nombre: 'fsdfdsggfkj' },
    { codigo: '04', nombre: 'fsdfdsggfkj' },
    { codigo: '04', nombre: 'fsdfdsggfkj' },
  ];
}
