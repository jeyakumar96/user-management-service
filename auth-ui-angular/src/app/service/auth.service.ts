import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError, tap } from 'rxjs';
import { TokenService } from './token.service';
import { environment } from '../../environments/environment';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string; // JWT will be added in future
}

// Backend contract types
interface BackendLoginResponse {
  accessToken: string;
  tokenType?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private tokenSvc = inject(TokenService);

  // Construct from environment for easy changes per build target
  private readonly baseUrl = `${environment.apiBaseUrl}${environment.apiAuthPath}`;

  login(payload: LoginRequest): Observable<AuthResponse> {
    const body = { usernameOrEmail: payload.email, password: payload.password };
    return this.http.post<BackendLoginResponse>(`${this.baseUrl}/login`, body).pipe(
      map((res) => {
        const token = res?.accessToken;
        if (token) {
          this.tokenSvc.setToken(token);
          return { success: true, token } as AuthResponse;
        }
        return { success: false, message: 'Invalid response from server' } as AuthResponse;
      }),
      catchError(this.handleError)
    );
  }

  register(payload: RegisterRequest): Observable<AuthResponse> {
    const body = { name: payload.name, username: payload.username, email: payload.email, password: payload.password };
    return this.http.post(`${this.baseUrl}/register`, body, { responseType: 'text' }).pipe(
      map((message) => ({ success: true, message }) as AuthResponse),
      catchError(this.handleError)
    );
  }

  logout() {
    this.tokenSvc.clearToken();
  }

  private handleError(err: HttpErrorResponse) {
    let message = 'Unexpected error. Please try again.';
    if (err.error) {
      if (typeof err.error === 'string') message = err.error;
      else if ((err.error as any).message) message = (err.error as any).message;
      else if ((err.error as any).error) message = (err.error as any).error;
    } else if (err.message) {
      message = err.message;
    }
    return throwError(() => ({ success: false, message } as AuthResponse));
  }
}
