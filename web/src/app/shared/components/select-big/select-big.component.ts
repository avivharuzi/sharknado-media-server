import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-select-big',
  templateUrl: './select-big.component.html',
  styleUrls: ['./select-big.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectBigComponent {
  @Input() icon: string;
  @Input() active: boolean;
}
