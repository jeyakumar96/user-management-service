import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Do NOT attach token for auth endpoints
  const isAuthEndpoint = /\/api\/v1\/auth\/(login|register)$/i.test(req.url);
  if (isAuthEndpoint) {
    return next(req);
  }

  const token = localStorage.getItem('accessToken');
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  return next(req);
};
