import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface WarningPopupMessage {
    id?: string;
    title?: string;
    message: string;
    duration?: number; // Duration in milliseconds (0 means no auto-close)
    showCloseButton?: boolean;
    customIcon?: string; // Path to custom SVG icon
    iconType?: 'text' | 'svg'; // Type of icon to display
}

@Component({
    selector: 'app-popup-warning',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './popup-warning.component.html',
    styleUrl: './popup-warning.component.scss'
})
export class PopupWarningComponent implements OnInit {
    @Input() popup!: WarningPopupMessage;
    @Input() position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'center' = 'top-right';
    @Output() closePopup = new EventEmitter<string>();

    isVisible = false;
    private autoCloseTimer?: number;

    ngOnInit() {
        // Set default values
        if (!this.popup.showCloseButton && this.popup.showCloseButton !== false) {
            this.popup.showCloseButton = true;
        }
        if (!this.popup.duration && this.popup.duration !== 0) {
            this.popup.duration = 7000; // Warning popups stay longer (7 seconds)
        }

        // Show popup immediately
        this.isVisible = true;

        // Auto close if duration is set
        if (this.popup.duration > 0) {
            this.autoCloseTimer = window.setTimeout(() => {
                this.close();
            }, this.popup.duration);
        }
    }

    close() {
        this.isVisible = false;

        // Clear auto-close timer if exists
        if (this.autoCloseTimer) {
            clearTimeout(this.autoCloseTimer);
        }

        // Emit close event after animation
        setTimeout(() => {
            this.closePopup.emit(this.popup.id);
        }, 300);
    }

    getIcon(): string {
        // If custom icon is provided, return it
        if (this.popup.customIcon) {
            return this.popup.customIcon;
        }

        // Default warning icon
        return '⚠';
    }

    getIconType(): 'text' | 'svg' {
        return this.popup.iconType || 'text';
    }

    isCustomIcon(): boolean {
        return !!this.popup.customIcon;
    }

    getPositionClass(): string {
        return `popup-${this.position}`;
    }
}
