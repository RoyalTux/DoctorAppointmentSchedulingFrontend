import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'ng-uikit-pro-standard';
import { TokenStorageService } from 'src/app/shared/services/token-old/token-storage.service';

import Doctor from '../models/doctor.model';
import { DoctorService } from '../services/doctor.service';

@Component({
  selector: 'app-doctor-profile-edit',
  templateUrl: './doctor-profile-edit.component.html',
  styleUrls: ['./doctor-profile-edit.component.scss']
})
export class DoctorProfileEditComponent implements OnInit {
  errorMessage: any;
  currentDoctor: Doctor;
  token;
  isLoggedIn = false;
  doctorData: Doctor = new Doctor();

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
    private doctorService: DoctorService,
    private router: Router,
    private toastrService: ToastService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.token = this.tokenStorage.getToken();
      this.isLoggedIn = true;
      this.currentDoctor = this.tokenStorage.getUser();

      this.doctorService.getDoctorById(this.currentDoctor.id).subscribe(
        data => {
          this.doctorData = data;
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

  onSubmit(): void {
    let doctor: Doctor = {
      firstName: this.capitalize(this.form.firstName),
      lastName: this.capitalize(this.form.lastName),
      country: this.capitalize(this.form.country),
      city: this.capitalize(this.form.city),
      bio: this.capitalize(this.form.bio),
      phoneNumber: this.capitalize(this.form.phoneNumber),
      experienceYears: this.form.experienceYears,
      rating: this.doctorData.rating,
      id: this.currentDoctor.id
    };

    this.doctorService.putDoctorProfileById(this.currentDoctor.id, doctor).subscribe(
      data => {
        console.log(data);  
        this.showSuccess();
      },
      err => {
        this.errorMessage = err.error;
        this.showError(this.errorMessage);
      }
    );

    this.router.navigateByUrl('/profile');
  }

  setFormValues(){
    for(let index in this.doctorData){
      if(this.doctorData[index] === 'Not indicated!'){
          this.doctorData[index] = '';
      }
    }

    this.form = {
      firstName: this.doctorData.firstName,
      lastName: this.doctorData.lastName,
      country: this.doctorData.country,
      city: this.doctorData.city,
      bio: this.doctorData.bio,
      phoneNumber: this.doctorData.phoneNumber,
      experienceYears: this.doctorData.experienceYears
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
