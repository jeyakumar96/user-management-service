import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PopupContainerComponent } from './shared/popup-container/popup-container.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, PopupContainerComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('auth-ui-angular');
}
