import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'ng-uikit-pro-standard';

import { TokenStorageService } from '../../shared/services/token-old/token-storage.service';
import Doctor from '../models/doctor.model';
import { DoctorService } from '../services/doctor.service';

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.scss']
})
export class DoctorProfileComponent implements OnInit {
  errorMessage: any;
  currentDoctor: Doctor;
  doctorData: Doctor = new Doctor();

  constructor(
    private tokenService: TokenStorageService,
    private router: Router,
    private doctorService: DoctorService,
    private toastrService: ToastService) { }

  ngOnInit(): void {
    this.currentDoctor = this.tokenService.getUser();
    // this.role = this.capitalize(this.currentDoctor.role);

    this.doctorService.getDoctorById(this.currentDoctor.id).subscribe(
      data => {
        this.doctorData = data;
      },
      err => {
        this.errorMessage = JSON.parse(err.error).message;
        console.log(this.errorMessage);
        this.showError(this.errorMessage);
      }
    );
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