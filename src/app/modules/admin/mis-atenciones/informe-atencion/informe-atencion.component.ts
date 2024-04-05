import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CodigoAlerta, DTOArchivo } from 'src/app/shared/models/shared.models';

@Component({
  selector: 'informe-atencion',
  templateUrl: './informe-atencion.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InformeAtencionComponent {
  codigosDeAlertaSeleccionados: CodigoAlerta[] = [];
  archivos: DTOArchivo[] = [
    { id: '1', uuid: '', nombre: 'Archivo 1' },
    { id: '2', uuid: '', nombre: 'Archivo 2' },
    { id: '3', uuid: '', nombre: 'Archivo 3' },
    { id: '4', uuid: '', nombre: 'Archivo 4' }
  ];

  codigosDeAlerta: CodigoAlerta[] = [
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
