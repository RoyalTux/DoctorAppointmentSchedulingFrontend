import { Directive, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OidcAuthService } from 'src/app/shared/services/auth/oidc-auth.service';

@Directive({
  selector: 'app-auth-callback'
})
export class AuthCallbackDirective implements OnInit {

  constructor(private authService: OidcAuthService, 
    private router: Router) { }

  ngOnInit(): void {
    this.authService.completeSignIn().then((value) => {
      this.router.navigate(["/"]);
    });
  }
}
