import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, MatDialogModule],
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

  constructor(private authService: AuthService, private router: Router, public dialog: MatDialog) {}



    logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}

