import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const authGuard: CanActivateFn = () => {
    const tokenSvc = inject(TokenService);
    const router = inject(Router);

    if (tokenSvc.hasToken()) {
        return true;
    }

    router.navigateByUrl('/login');
    return false;
};
