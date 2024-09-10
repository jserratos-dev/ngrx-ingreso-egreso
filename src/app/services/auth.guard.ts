import { inject } from '@angular/core';
import { CanMatchFn, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from './auth.service';
import { take, tap } from 'rxjs';

export const authGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  const authService = inject(AuthService);
  const router      = inject(Router);

  return authService.isAuth()
    .pipe(
      tap(estado => {
        if(!estado) { 
          router.navigateByUrl('/login') 
        }
      }),
      take(1)
    );
};

