import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SuccessPopupMessage } from './popup-success/popup-success.component';
import { ErrorPopupMessage } from './popup-error/popup-error.component';
import { WarningPopupMessage } from './popup-warning/popup-warning.component';
import { InfoPopupMessage } from './popup-info/popup-info.component';

export type PopupComponentType = 'success' | 'error' | 'warning' | 'info';

export interface PopupInstance {
  id: string;
  type: PopupComponentType;
  data: SuccessPopupMessage | ErrorPopupMessage | WarningPopupMessage | InfoPopupMessage;
}

@Injectable({
  providedIn: 'root'
})
export class PopupManagerService {
  private popupsSubject = new BehaviorSubject<PopupInstance[]>([]);
  public popups$ = this.popupsSubject.asObservable();

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private addPopup(popup: PopupInstance): void {
    const currentPopups = this.popupsSubject.value;
    // Emit on next microtask to avoid changing bindings during the same CD cycle
    queueMicrotask(() => {
      this.popupsSubject.next([...currentPopups, popup]);
    });
  }

  // Success popup methods
  showSuccess(message: string, title?: string, options?: Partial<SuccessPopupMessage>): string {
    const id = this.generateId();
    const popup: PopupInstance = {
      id,
      type: 'success',
      data: {
        id,
        message,
        title: title || 'Success',
        duration: 5000,
        showCloseButton: true,
        ...options
      }
    };
    this.addPopup(popup);
    return id;
  }

  showSuccessWithSvg(message: string, svgPath: string, title?: string, options?: Partial<SuccessPopupMessage>): string {
    return this.showSuccess(message, title, {
      ...options,
      customIcon: svgPath,
      iconType: 'svg'
    });
  }

  // Error popup methods
  showError(message: string, title?: string, options?: Partial<ErrorPopupMessage>): string {
    const id = this.generateId();
    const popup: PopupInstance = {
      id,
      type: 'error',
      data: {
        id,
        message,
        title: title || 'Error',
        duration: 0, // Error popups don't auto-close by default
        showCloseButton: true,
        ...options
      }
    };
    this.addPopup(popup);
    return id;
  }

  showErrorWithSvg(message: string, svgPath: string, title?: string, options?: Partial<ErrorPopupMessage>): string {
    return this.showError(message, title, {
      ...options,
      customIcon: svgPath,
      iconType: 'svg'
    });
  }

  // Warning popup methods
  showWarning(message: string, title?: string, options?: Partial<WarningPopupMessage>): string {
    const id = this.generateId();
    const popup: PopupInstance = {
      id,
      type: 'warning',
      data: {
        id,
        message,
        title: title || 'Warning',
        duration: 7000, // Warning popups stay longer
        showCloseButton: true,
        ...options
      }
    };
    this.addPopup(popup);
    return id;
  }

  showWarningWithSvg(message: string, svgPath: string, title?: string, options?: Partial<WarningPopupMessage>): string {
    return this.showWarning(message, title, {
      ...options,
      customIcon: svgPath,
      iconType: 'svg'
    });
  }

  // Info popup methods
  showInfo(message: string, title?: string, options?: Partial<InfoPopupMessage>): string {
    const id = this.generateId();
    const popup: PopupInstance = {
      id,
      type: 'info',
      data: {
        id,
        message,
        title: title || 'Information',
        duration: 4000, // Info popups close quickly
        showCloseButton: true,
        ...options
      }
    };
    this.addPopup(popup);
    return id;
  }

  showInfoWithSvg(message: string, svgPath: string, title?: string, options?: Partial<InfoPopupMessage>): string {
    return this.showInfo(message, title, {
      ...options,
      customIcon: svgPath,
      iconType: 'svg'
    });
  }

  // Method to close a specific popup
  close(id: string): void {
    const currentPopups = this.popupsSubject.value;
    const filteredPopups = currentPopups.filter(popup => popup.id !== id);
    this.popupsSubject.next(filteredPopups);
  }

  // Method to close all popups
  closeAll(): void {
    this.popupsSubject.next([]);
  }

  // Method to get current popups
  getPopups(): PopupInstance[] {
    return this.popupsSubject.value;
  }
}
