import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';
import { ToastService } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  form: any = {
    firstName: null,
    lastName: null,
    country: null,
    city: null,
    bio: null,
    phoneNumber: null
  };

  user_data;
  token;
  isLoggedIn = false;
  role: string = '';
  id: string = '';
  errorMessage = '';

  constructor(
    private tokenStorage: TokenStorageService,
    private userService: UserService,
    private router: Router,
    private toastrService: ToastService) { }

  ngOnInit(): void {
    debugger;
    if (this.tokenStorage.getToken()) {
      this.token = this.tokenStorage.getToken();
      this.isLoggedIn = true;
      this.user_data = this.tokenStorage.getUser();
      this.role = this.user_data.role;
      this.id = this.user_data.sub;

      if(this.role == 'doctor'){
        this.form.experienceYears = null;
      }
      else if(this.role == 'patient'){
        this.form.address = null;
      }
    }
  }

  onSubmit(): void {
    // debugger;
    // const { 
    //   firstName,
    //   lastName,
    //   country,
    //   city,
    //   bio,
    //   phoneNumber,
    //   address 
    // } = this.form;

    // this.userService.postPatientProfile(
    //   this.token,
    //   firstName,
    //   lastName,
    //   country,
    //   city,
    //   bio,
    //   phoneNumber,
    //   this.id,
    //   address ).subscribe(
    //   data => {
    //     debugger;
    //     console.log(data);  

    //     this.showSuccess();
    //   },
    //   err => {
    //     debugger;
    //     this.errorMessage = err.error;
    //     console.log(this.errorMessage);
    //     console.log(err);
    //     this.showError();
    //   }
    // );

    this.router.navigateByUrl('/profile');
  }

  showSuccess() {
    const options = { opacity: 0.8 };
    this.toastrService.success('Success!', 'Profile updated!', options);
  }
  
  showError() {
    const options = { opacity: 0.8 };
    this.toastrService.error('Please try again', 'Profile update error!', options);
  }
}
