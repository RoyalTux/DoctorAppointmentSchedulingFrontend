import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  userData: User = new User();

  constructor(
    private tokenService: TokenStorageService,
    private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser();
    console.log(this.currentUser);

    if(this.currentUser.role == 'doctor'){
      this.userService.getDoctorById(this.currentUser.sub).subscribe(
        data => {
          this.userData = data;
          console.log(this.userData);
        },
        err => {
          this.errorMessage = JSON.parse(err.error).message;
          console.log(this.errorMessage);
        }
      );
    }
    else if(this.currentUser.role == 'patient'){
      this.userService.getPatientById(this.currentUser.sub).subscribe(
        data => {
          this.userData = data;
          console.log(this.userData);
        },
        err => {
          this.errorMessage = JSON.parse(err.error).message;
          console.log(this.errorMessage);
        }
      );
    }
  }

  changeProfileData(){
    this.router.navigateByUrl('/profile-edit');
  }
}