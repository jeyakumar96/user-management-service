import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { PopupManagerService } from '../../shared/popup-manager.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private auth = inject(AuthService);
  private popup = inject(PopupManagerService);

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required]], // accept username or email
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  readonly loading = signal(false);
  readonly serverError = signal<string | null>(null);

  onSubmit() {
    // Mark and validate; if valid, navigate to register as requested
    this.form.markAllAsTouched();
    if (this.form.valid) {
      this.loading.set(true);
      this.serverError.set(null);
      this.auth.login(this.form.getRawValue()).subscribe({
        next: (res) => {
          this.loading.set(false);
          if (res.success) {
            this.popup.showSuccess('Logged in successfully', { positionClass: 'popup-top-right' });
            // Decode roles from JWT and route accordingly
            const roles = this.auth.getRolesFromToken();
            const isAdmin = roles.includes('ROLE_ADMIN');
            this.router.navigateByUrl(isAdmin ? '/admin' : '/dashboard');
          } else {
            this.serverError.set(res.message ?? 'Login failed');
            this.popup.showError(this.serverError()!, { positionClass: 'popup-top-right' });
          }
        },
        error: (err: { message?: string }) => {
          this.loading.set(false);
          this.serverError.set(err?.message ?? 'Login failed');
          this.popup.showError(this.serverError()!, { positionClass: 'popup-top-right' });
        }
      });
    }
  }
}
