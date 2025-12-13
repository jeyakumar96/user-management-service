import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';

export interface LoginRequest {
  email: string; // accepts username or email
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  tokenType?: string;
}

export interface RegisterRequest {
  name: string;
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/api/v1/auth';

  login(req: LoginRequest): Observable<{ success: boolean; message?: string }> {
    const payload = {
      usernameOrEmail: req.email,
      password: req.password
    };
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, payload).pipe(
      tap(res => {
        if (res?.accessToken) {
          localStorage.setItem('accessToken', res.accessToken);
        }
      }),
      map(res => ({ success: !!res?.accessToken }))
    );
  }

  register(req: RegisterRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, req);
  }

  logout(): void {
    localStorage.removeItem('accessToken');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('accessToken');
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1] || ''));
      const exp = Number(payload?.exp) || 0;
      return exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  getRolesFromToken(): string[] {
    const token = localStorage.getItem('accessToken');
    if (!token) return [];
    try {
      const payload = JSON.parse(atob(token.split('.')[1] || ''));
      return Array.isArray(payload?.roles) ? payload.roles : [];
    } catch {
      return [];
    }
  }
}
