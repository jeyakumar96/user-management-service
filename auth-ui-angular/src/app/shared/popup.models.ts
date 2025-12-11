export type PopupType = 'success' | 'error';

export interface PopupInstance {
  id: string;
  type: PopupType;
  message: string;
  duration: number; // ms; 0 = persist until close
  positionClass: string; // e.g. 'popup-top-right'
  iconType?: 'svg';
  customIcon?: string; // inline svg string when iconType === 'svg'
}

export const DEFAULT_SUCCESS_DURATION = 30;
export const DEFAULT_ERROR_DURATION = 0;

export const DEFAULT_POSITION = 'popup-top-right';
