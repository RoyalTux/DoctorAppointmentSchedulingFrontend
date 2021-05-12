import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { ToastService } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: any = {
    email: null,
    password: null,
    passwordConfirm: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  errorDetails = '';
  loginUrl: string = '';

  constructor(
    private authService: AuthService,
    private toastrService: ToastService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => this.loginUrl = params['returnUrl'] || '/login');
  }

  onSubmit(): void {
    const { email, password, passwordConfirm } = this.form;

    this.authService.register(email, password, passwordConfirm).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.showSuccess();
        this.router.navigateByUrl(this.loginUrl);
      },
      err => {
        this.errorMessage = err.error.message;
        this.errorDetails = err.error.detail;
        this.isSignUpFailed = true;
        this.showError();
      }
    );
  }

  showSuccess() {
    const options = { opacity: 0.8 };
    this.toastrService.success('Success!', 'Your registration is successful!', options);
  }

  showError() {
    const options = { opacity: 0.8 };
    this.toastrService.error('Please try again', 'Signup failed: ' + '' + this.errorDetails
    , options);
  }
}