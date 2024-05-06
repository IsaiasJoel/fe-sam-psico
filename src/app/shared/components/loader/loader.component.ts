import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderComponent {

}
