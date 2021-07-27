import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'ng-uikit-pro-standard';
import { TokenStorageService } from 'src/app/shared/services/token-old/token-storage.service';
import Patient from '../models/patient.model';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-patient-profile-edit',
  templateUrl: './patient-profile-edit.component.html',
  styleUrls: ['./patient-profile-edit.component.scss']
})
export class PatientProfileEditComponent implements OnInit {
  errorMessage: any;
  currentPatient: Patient;
  token;
  isLoggedIn = false;
  patientData: Patient = new Patient();

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
    private patientService: PatientService,
    private router: Router,
    private toastrService: ToastService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.token = this.tokenStorage.getToken();
      this.isLoggedIn = true;
      this.currentPatient = this.tokenStorage.getUser();

      this.patientService.getPatientById(this.currentPatient.id).subscribe(
        data => {
          this.patientData = data;
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
    let patient: Patient = {
      firstName: this.capitalize(this.form.firstName),
      lastName: this.capitalize(this.form.lastName),
      country: this.capitalize(this.form.country),
      city: this.capitalize(this.form.city),
      bio: this.capitalize(this.form.bio),
      phoneNumber: this.capitalize(this.form.phoneNumber),
      address: this.capitalize(this.form.address),
      id: this.currentPatient.id
    };

    this.patientService.putPatientProfileById(this.currentPatient.id, patient).subscribe(
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
    for(let index in this.patientData){
      if(this.patientData[index] === 'Not indicated!'){
          this.patientData[index] = '';
      }
    }

    this.form = {
      firstName: this.patientData.firstName,
      lastName: this.patientData.lastName,
      country: this.patientData.country,
      city: this.patientData.city,
      phoneNumber: this.patientData.phoneNumber,
      address: this.patientData.address,
      bio: this.patientData.bio
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
