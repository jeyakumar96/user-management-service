import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { PopupManagerService, PopupInstance } from '../popup-manager.service';
import { PopupSuccessComponent } from '../popup-success/popup-success.component';
import { PopupErrorComponent } from '../popup-error/popup-error.component';
import { PopupWarningComponent } from '../popup-warning/popup-warning.component';
import { PopupInfoComponent } from '../popup-info/popup-info.component';

@Component({
    selector: 'app-popup-container',
    standalone: true,
    imports: [
        CommonModule,
        PopupSuccessComponent,
        PopupErrorComponent,
        PopupWarningComponent,
        PopupInfoComponent
    ],
    templateUrl: './popup-container.component.html',
    styleUrl: './popup-container.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupContainerComponent {
    public popups$!: Observable<PopupInstance[]>;

    constructor(private popupManager: PopupManagerService) {
        this.popups$ = this.popupManager.popups$;
    }

    onClosePopup(id: string) {
        this.popupManager.close(id);
    }

    trackByPopup(index: number, popup: PopupInstance): string {
        return popup.id;
    }
}
