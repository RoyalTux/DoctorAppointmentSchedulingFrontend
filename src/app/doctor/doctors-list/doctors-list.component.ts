import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'ng-uikit-pro-standard';
import { TokenStorageService } from '../../shared/services/token-old/token-storage.service';
import Doctor from '../models/doctor.model';
import { DoctorService } from '../services/doctor.service';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.scss']
})
export class DoctorsListComponent implements OnInit {
  errorMessage: any;
  currentDoctor: Doctor;
  doctorData: Doctor[] = [];

  constructor(
    private tokenService: TokenStorageService,
    private router: Router,
    private doctorService: DoctorService,
    private toastrService: ToastService) { }

  ngOnInit(): void {
    this.currentDoctor = this.tokenService.getUser();

    if(!this.currentDoctor){
      this.showError('Login error!');
      this.router.navigateByUrl('/home');
    }
    else{
      this.doctorService.getDoctors().subscribe(
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
