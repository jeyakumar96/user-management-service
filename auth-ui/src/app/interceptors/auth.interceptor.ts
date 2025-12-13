import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { TokenService } from '../services/token.service';

// Backend origin(s) come from environment
const API_ORIGINS = environment.apiOrigins ?? [];

function isApiUrl(url: string): boolean {
    return API_ORIGINS.some(origin => url.startsWith(origin));
}

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const tokenSvc = inject(TokenService);
    const router = inject(Router);

    let request = req;

    // Attach Authorization header to same-origin API calls when a token exists
    const token = tokenSvc.getToken();
    if (token && isApiUrl(req.url)) {
        request = req.clone({
            setHeaders: { Authorization: `Bearer ${token}` }
        });
    }

    return next(request).pipe(
        catchError((err: HttpErrorResponse) => {
            if (err.status === 401 || err.status === 403) {
                // Token expired/invalid or unauthorized — clear token and redirect to login
                tokenSvc.clearToken();
                router.navigateByUrl('/login');
            }
            return throwError(() => err);
        })
    );
};
