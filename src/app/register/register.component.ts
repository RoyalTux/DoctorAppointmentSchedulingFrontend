import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

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

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { email, password, passwordConfirm } = this.form;

    this.authService.register(email, password, passwordConfirm).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.errorDetails = err.error.detail;
        this.isSignUpFailed = true;
      }
    );
  }
}