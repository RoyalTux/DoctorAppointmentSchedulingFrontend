import { Injectable } from '@angular/core';
import { User, UserManager, UserManagerSettings } from 'oidc-client';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class OidcAuthService {
  // вынести в config
  // check enviropment and set settings
  private config: UserManagerSettings = {
      authority: 'https://localhost:5002/',
      client_id: 'DoctorAppointmentSchedulingFrontend',
      redirect_uri: 'http://localhost:4200/auth-callback',
      post_logout_redirect_uri: 'http://localhost:4200/',
      response_type: "id_token",
      scope: "openid profile email",
      filterProtocolClaims: true,
      loadUserInfo: true
  };

  private manager = new UserManager(this.config);
  private user: User = null;
  private userLoginSubject = new Subject<boolean>();

  constructor() {
      this.manager.getUser().then(user => {
          this.user = user;
      });
  }

  getUserLoggedInEvents(): Observable<boolean> {
      return this.userLoginSubject.asObservable();
  }

  isLoggedIn(): boolean {
    return this.user != null && !this.user.expired;
  }

  signIn(): Promise<void> {
      return this.manager.signinRedirect();
  }

  completeSignIn(): Promise<void> {
      return this.manager.signinRedirectCallback().then(user => {
          this.user = user;
          this.userLoginSubject.next(this.isLoggedIn());
      });
  }

  signOut(): Promise<void> {
      return this.manager.signoutRedirect();
  }

  completeSignOut(): Promise<void> {
      return this.manager.signoutRedirectCallback().then(user => {
          this.user = null;
          this.userLoginSubject.next(this.isLoggedIn());
      });
  }
}