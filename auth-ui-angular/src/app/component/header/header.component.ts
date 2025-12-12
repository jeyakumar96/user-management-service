import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() appsMenuToggle = new EventEmitter<void>();

  user = {
    name: 'Jeyakumar Moorthy',
    email: 'jeyakumar.moorthy@kanini.com',
    avatar: 'Myphoto.jpg'
    };

  showAppsMenu = false;

  onAppsMenuClick() {
    this.showAppsMenu = !this.showAppsMenu;
    this.appsMenuToggle.emit();
  }
}
