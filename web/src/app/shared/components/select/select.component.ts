import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent {
  @Input() icon: string;
  @Input() disabled: boolean;
  @Input() active: boolean;
}
