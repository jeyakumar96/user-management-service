import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupSuccessComponent } from '../popup-success/popup-success.component';
import { PopupErrorComponent } from '../popup-error/popup-error.component';
import { PopupManagerService } from '../popup-manager.service';
import { PopupInstance } from '../popup.models';




@Component({
    selector: 'app-popup-container',
    standalone: true,
    imports: [CommonModule, PopupSuccessComponent, PopupErrorComponent],
    templateUrl: './popup-container.component.html',
    styleUrl: './popup-container.component.scss'
})
export class PopupContainerComponent {
  private manager = inject(PopupManagerService);
  popups: PopupInstance[] = [];

  constructor() {
    this.manager.stream.subscribe(list => this.popups = list);
  }

  onClose(id: string) {
    this.manager.close(id);
  }
}
