import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'ng-uikit-pro-standard';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';
import User from '../_models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  errorMessage: any;
  currentUser: any;
  role: string = '';
  userData: User = new User();

  constructor(
    private tokenService: TokenStorageService,
    private router: Router,
    private userService: UserService,
    private toastrService: ToastService) { }

  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser();
    this.role = this.capitalize(this.currentUser.role);

    if(this.currentUser.role == 'doctor'){
      this.userService.getDoctorById(this.currentUser.sub).subscribe(
        data => {
          this.userData = data;
        },
        err => {
          this.errorMessage = JSON.parse(err.error).message;
          console.log(this.errorMessage);
          this.showError(this.errorMessage);
        }
      );
    }
    else if(this.currentUser.role == 'patient'){
      this.userService.getPatientById(this.currentUser.sub).subscribe(
        data => {
          this.userData = data;
        },
        err => {
          this.errorMessage = JSON.parse(err.error).message;
          console.log(this.errorMessage);
          this.showError(this.errorMessage);
        }
      );
    }
  }

  capitalize(sentence: string) {
    if (typeof sentence !== 'string'){
      return '';
    }

    return sentence.charAt(0).toUpperCase() + sentence.slice(1);
  }

  changeProfileData(){
    this.router.navigateByUrl('/profile-edit');
  }
  
  showError(error: string) {
    const options = { opacity: 0.8 };
    this.toastrService.error('Please try again', error, options);
  }
}