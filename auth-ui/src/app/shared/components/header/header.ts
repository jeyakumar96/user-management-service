import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
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

