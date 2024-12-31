import { CanActivateFn } from '@angular/router';
import { AuthService } from '../auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)
  const document = inject(DOCUMENT)
  const local = document.defaultView?.localStorage;
  if(local?.getItem('userToken') != null) {
      authService.token.next(JSON.stringify(local?.getItem('userToken')))
    return true;
  }else {
    router.navigate(['login'])
    return false;
  }
};
