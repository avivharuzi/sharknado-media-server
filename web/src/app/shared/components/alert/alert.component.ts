import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export enum AlertType {
  Danger = 'danger',
}

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent {
  @Input() type: AlertType;
  @Input() message: string;
}
