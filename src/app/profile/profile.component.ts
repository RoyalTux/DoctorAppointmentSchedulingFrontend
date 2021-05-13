import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  userData: any;

  constructor(
    private tokenService: TokenStorageService,
    private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    debugger;
    this.currentUser = this.tokenService.getUser();
    let userId = this.currentUser.sub;
    let token = this.tokenService.getToken()!.replace("\"", "");

    console.log(this.userData);
  }

  changeProfileData(){
    this.router.navigateByUrl('/profile-edit');
  }
}