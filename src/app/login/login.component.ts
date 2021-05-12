import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { ToastService } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };

  returnUrl: string = '';
  user_data;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  role: string = '';
  name: string = '';

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastService) { }

  ngOnInit(): void {

    this.route.queryParams
      .subscribe(params => this.returnUrl = params['returnUrl'] || '/home');

    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.user_data = this.tokenStorage.getUser();
      this.role = this.user_data.role;
      this.name = this.user_data.name;
    }
  }

  onSubmit(): void {
    const { email, password } = this.form;

    this.authService.login(email, password).subscribe(
      data => {
        debugger;
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.user_data = this.tokenStorage.getUser();
        this.role = this.user_data.role;
        this.name = this.user_data.name;   

        setTimeout(() => {
          this.reloadPage();
        }, 3000);
        
        this.showSuccess();  
      },
      err => {
        debugger;
        this.errorMessage = err.error;
        console.log(this.errorMessage);
        console.log(err);
        this.isLoginFailed = true;
        this.showError();
      }
    );

    this.router.navigateByUrl(this.returnUrl);
  }

  reloadPage(): void {    
    window.location.reload();
  }

  showSuccess() {
    const options = { opacity: 0.8 };
    this.toastrService.success('Success!', 'Hello, ' + this.name + '!\nYou logged in as ' + this.role + '.', options);
  }
  
  showError() {
    const options = { opacity: 0.8 };
    this.toastrService.error('Please try again', 'Login failed: Icorrect login or password!', options);
  }
}