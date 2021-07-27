import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'ng-uikit-pro-standard';
import { TokenStorageService } from 'src/app/shared/services/token-old/token-storage.service';
import Patient from '../models/patient.model';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss']
})
export class PatientProfileComponent implements OnInit {
  errorMessage: any;
  currentPatient: Patient;
  patientData: Patient = new Patient();

  constructor(
    private tokenService: TokenStorageService,
    private router: Router,
    private patientService: PatientService,
    private toastrService: ToastService) { }

  ngOnInit(): void {
    this.currentPatient = this.tokenService.getUser();

      this.patientService.getPatientById(this.currentPatient.id).subscribe(
        data => {
          this.patientData = data;
        },
        err => {
          this.errorMessage = JSON.parse(err.error).message;
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