import { Component, Input } from '@angular/core';
import { BooleanInput } from 'ng-boolean-input';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss'],
})
export class TitleComponent {
  @BooleanInput @Input() light;
  @Input() icon: IconProp;
}
