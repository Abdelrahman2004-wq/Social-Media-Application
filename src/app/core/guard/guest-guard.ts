// guest-guard.ts
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

export const guestGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);
  const _PlatformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(_PlatformId) && localStorage.getItem("SocialToken")) {
    return _Router.parseUrl("app/feed");
  } else {
    return true;
  }
};
