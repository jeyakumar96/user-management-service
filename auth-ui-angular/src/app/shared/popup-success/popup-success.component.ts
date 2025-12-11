import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-popup-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './popup-success.component.html',
  styleUrl: './popup-success.component.scss'
})
export class PopupSuccessComponent {
  @Input() title = 'Success';
  @Input() message = 'Operation completed successfully!';
  @Input() iconType?: 'svg';
  @Input() customIcon?: string;
  @Output() close = new EventEmitter<void>();
}
