import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DEFAULT_ERROR_DURATION, DEFAULT_POSITION, DEFAULT_SUCCESS_DURATION, PopupInstance } from './popup.models';

@Injectable({ providedIn: 'root' })
export class PopupManagerService {
  private popups$ = new BehaviorSubject<PopupInstance[]>([]);
  readonly stream = this.popups$.asObservable();

  showSuccess(message: string, options?: { duration?: number; positionClass?: string }) {
    return this.push({
      type: 'success',
      message,
      duration: options?.duration ?? DEFAULT_SUCCESS_DURATION,
      positionClass: options?.positionClass ?? DEFAULT_POSITION,
      iconType: 'svg',
      customIcon: '/assets/icons/success.svg',
    });
  }

  showSuccessWithSvg(message: string, svg: string, options?: { duration?: number; positionClass?: string }) {
    return this.push({
      type: 'success',
      message,
      duration: options?.duration ?? DEFAULT_SUCCESS_DURATION,
      positionClass: options?.positionClass ?? DEFAULT_POSITION,
      iconType: 'svg',
      customIcon: svg,
    });
  }

  showError(message: string, options?: { duration?: number; positionClass?: string }) {
    return this.push({
      type: 'error',
      message,
      duration: options?.duration ?? DEFAULT_ERROR_DURATION,
      positionClass: options?.positionClass ?? DEFAULT_POSITION,
      iconType: 'svg',
      customIcon: '/assets/icons/error.svg',
    });
  }

  showErrorWithSvg(message: string, svg: string, options?: { duration?: number; positionClass?: string }) {
    return this.push({
      type: 'error',
      message,
      duration: options?.duration ?? DEFAULT_ERROR_DURATION,
      positionClass: options?.positionClass ?? DEFAULT_POSITION,
      iconType: 'svg',
      customIcon: svg,
    });
  }

  close(id: string) {
    const list = this.popups$.getValue().filter(p => p.id !== id);
    this.popups$.next(list);
  }

  closeAll() {
    this.popups$.next([]);
  }

  private push(partial: Omit<PopupInstance, 'id'>) {
    const id = crypto.randomUUID?.() ?? Math.random().toString(36).slice(2);
    const popup: PopupInstance = { id, ...partial };
    const list = [...this.popups$.getValue(), popup];
    this.popups$.next(list);
    if (popup.duration && popup.duration > 0) {
      setTimeout(() => this.close(id), popup.duration);
    }
    return id;
  }
}
