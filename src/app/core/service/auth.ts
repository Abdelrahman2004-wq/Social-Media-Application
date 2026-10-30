import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly _HttpClient = inject(HttpClient);
  private readonly _Router = inject(Router);
  private readonly _PlatformId = inject(PLATFORM_ID);

//SignUp API  
  singUp(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}users/signup`, data)
  }

//SignIn API
  singIn(data:object):Observable<any>{
    return this._HttpClient.post(`${environment.baseURL}users/signin`, data)
  }

//LogOut
  logOut() :void{
    if (isPlatformBrowser(this._PlatformId)) {
      localStorage.removeItem("SocialToken");
    }
    this._Router.navigate(["auth/login"]);
  }
}
