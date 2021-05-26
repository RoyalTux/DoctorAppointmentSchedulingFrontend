import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'ng-uikit-pro-standard';
import User from '../_models/user';
import { TokenStorageService } from '../_services/token-storage.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.scss']
})
export class DoctorsListComponent implements OnInit {
  errorMessage: any;
  currentUser: any;
  role: string = '';
  doctorData: User[] = [];

  constructor(
    private tokenService: TokenStorageService,
    private router: Router,
    private userService: UserService,
    private toastrService: ToastService) { }

  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser();

    if(!this.currentUser){
      this.showError('Login error!');
      this.router.navigateByUrl('/home');
    }
    else{
      this.userService.getDoctors().subscribe(
        data => {
          this.doctorData = data;
          console.log(this.doctorData);
        },
        err => {
          this.errorMessage = JSON.parse(err.error).message;
          console.log(this.errorMessage);
          this.showError(this.errorMessage);
        }
      );
    }
  }

  createRange(number){
    var items: number[] = [];
    number = parseInt(number);
    
    for(var i = 1; i <= number; i++){
       items.push(i);
    }

    return items;
  }

  showError(error: string) {
    const options = { opacity: 0.8 };
    this.toastrService.error('Try again later!', error, options);
  }
}
