import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { PopupManagerService } from '../../shared/components/popup-manager.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private auth = inject(Auth);
  private popup = inject(PopupManagerService);

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]],
    terms: [false, [Validators.requiredTrue]],
  }, { validators: this.passwordsMatch });

  private passwordsMatch(ctrl: AbstractControl): ValidationErrors | null {
    const p = ctrl.get('password')?.value;
    const c = ctrl.get('confirmPassword')?.value;
    return p && c && p !== c ? { mismatch: true } : null;
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const { name, username, email, password } = this.form.getRawValue();
      this.auth.register({ name, username, email, password }).subscribe({
        next: (res: any) => {
          const success = !!res?.message;
          if (success) {
            this.popup.showSuccess(res.message ?? 'Registered successfully');
            this.router.navigateByUrl('/login');
          } else {
            this.form.setErrors({ server: res?.message ?? 'Registration failed' });
            this.popup.showError(res?.message ?? 'Registration failed');
          }
        },
        error: (err: any) => {
          const msg = err?.message ?? 'Registration failed';
          this.form.setErrors({ server: msg });
          this.popup.showError(msg);
        }
      });
    }
  }
}
