import { Component, Input } from '@angular/core';
import { LOADERS } from '../../lib/ngx-spinner.enum';
import { BooleanInput } from 'ng-boolean-input';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  @Input() type;

  @BooleanInput @Input() light;

  get iterable(): Array<number> {
    const arr = [];
    for (let i = 0; i < LOADERS[this.type]; i++) {
      arr.push(i);
    }
    return arr;
  }
}
