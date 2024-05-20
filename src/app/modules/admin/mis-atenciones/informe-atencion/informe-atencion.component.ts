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
    { codigo: '01', descripcion: 'Suicidio' },
    { codigo: '02', descripcion: 'Violación sexual' },
    { codigo: '03', descripcion: 'Diversidad sexual' },
    { codigo: '04', descripcion: 'Xenofobia' },
    { codigo: '04', descripcion: 'fsdfdsggfkj' },
    { codigo: '04', descripcion: 'fsdfdsggfkj' },
    { codigo: '04', descripcion: 'fsdfdsggfkj' },
    { codigo: '04', descripcion: 'fsdfdsggfkj' },
    { codigo: '04', descripcion: 'fsdfdsggfkj' },
    { codigo: '04', descripcion: 'fsdfdsggfkj' },
    { codigo: '04', descripcion: 'fsdfdsggfkj' },
  ];
}
