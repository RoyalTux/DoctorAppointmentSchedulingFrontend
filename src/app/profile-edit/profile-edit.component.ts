import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';
import { ToastService } from 'ng-uikit-pro-standard';
import User from '../_models/user';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  errorMessage: any;
  currentUser: any;
  token;
  isLoggedIn = false;
  role: string = '';
  id: string = '';
  userData: User = new User();

  form: any = {
    firstName: null,
    lastName: null,
    country: null,
    city: null,
    bio: null,
    phoneNumber: null,
    address: null,
    experienceYears: null
  };

  constructor(
    private tokenStorage: TokenStorageService,
    private userService: UserService,
    private router: Router,
    private toastrService: ToastService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.token = this.tokenStorage.getToken();
      this.isLoggedIn = true;
      this.currentUser = this.tokenStorage.getUser();
      this.role = this.currentUser.role;
      this.id = this.currentUser.sub;

      if(this.role == 'doctor'){
        this.userService.getDoctorById(this.currentUser.sub).subscribe(
          data => {
            this.userData = data;
            this.setFormValues();
          },
          err => {
            this.errorMessage = JSON.parse(err.error).message;
            console.log(this.errorMessage);
            this.showError(this.errorMessage);
          }
        );
      }
      else if(this.role == 'patient'){
        this.userService.getPatientById(this.currentUser.sub).subscribe(
          data => {
            this.userData = data;
            this.setFormValues();
          },
          err => {
            this.errorMessage = JSON.parse(err.error).message;
            console.log(this.errorMessage);
            this.showError(this.errorMessage);
          }
        );
      }
    }
  }

  onSubmit(): void {
    let user: User = {
      firstName: this.capitalize(this.form.firstName),
      lastName: this.capitalize(this.form.lastName),
      country: this.capitalize(this.form.country),
      city: this.capitalize(this.form.city),
      bio: this.capitalize(this.form.bio),
      phoneNumber: this.capitalize(this.form.phoneNumber),
      address: this.capitalize(this.form.address),
      experienceYears: this.form.experienceYears,
      rating: this.userData.rating,
      id: this.id
    };

    console.log(user);

    if(this.role == 'doctor'){
      delete user.address;

      this.userService.putDoctorProfileById(this.id, user).subscribe(
        data => {
          console.log(data);  
          this.showSuccess();
        },
        err => {
          this.errorMessage = err.error;
          this.showError(this.errorMessage);
        }
      );
    }
    else if(this.role == 'patient'){
      delete user.experienceYears;
      delete user.rating;

      this.userService.putPatientProfileById(this.id, user).subscribe(
        data => {
          console.log(data);  
          this.showSuccess();
        },
        err => {
          this.errorMessage = err.error;
          this.showError(this.errorMessage);
        }
      );
    }

    this.router.navigateByUrl('/profile');
  }

  setFormValues(){
    for(let index in this.userData){
      if(this.userData[index] === 'Not indicated!'){
          this.userData[index] = '';
      }
    }

    this.form = {
      firstName: this.userData.firstName,
      lastName: this.userData.lastName,
      country: this.userData.country,
      city: this.userData.city,
      phoneNumber: this.userData.phoneNumber,
      address: this.userData.address,
      bio: this.userData.bio,
      experienceYears: this.userData.experienceYears
    }
  }

  capitalize(sentence: string) {
    if (typeof sentence !== 'string'){
      return '';
    }

    return sentence.charAt(0).toUpperCase() + sentence.slice(1);
  }

  showSuccess() {
    const options = { opacity: 0.8 };
    this.toastrService.success('Success!', 'Profile updated!', options);
  }
  
  showError(error: string) {
    const options = { opacity: 0.8 };
    this.toastrService.error('Please try again', error, options);
  }
}
