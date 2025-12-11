import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { TokenService } from '../service/token.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
    const tokenSvc = inject(TokenService);
    const router = inject(Router);

    if (tokenSvc.hasToken()) {
        return true;
    }

    router.navigateByUrl('/login');
    return false;
};
