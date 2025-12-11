import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popup-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup-error.component.html',
  styleUrl: './popup-error.component.scss'
})

export class PopupErrorComponent {
  @Input() title = 'Error';
  @Input() message = 'Something went wrong.';
  @Input() iconType?: 'svg';
  @Input() customIcon?: string;
  @Output() close = new EventEmitter<void>();
}
