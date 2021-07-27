import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { PatientScheduleComponent } from './patient/patient-schedule/patient-schedule.component';
import { DoctorScheduleComponent } from './doctor/doctor-schedule/doctor-schedule.component';
import { DoctorsListComponent } from './doctor/doctors-list/doctors-list.component';
import { AuthCallbackDirective } from './auth/auth-callback/auth-callback.directive';
import { PatientProfileEditComponent } from './patient/patient-profile-edit/patient-profile-edit.component';
import { PatientProfileComponent } from './patient/patient-profile/patient-profile.component';
import { DoctorProfileComponent } from './doctor/doctor-profile/doctor-profile.component';
import { DoctorProfileEditComponent } from './doctor/doctor-profile-edit/doctor-profile-edit.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'patient-profile', component: PatientProfileComponent },
  { path: 'patient-profile-edit', component: PatientProfileEditComponent },
  { path: 'patient-schedule', component: PatientScheduleComponent },
  { path: 'doctor-schedule', component: DoctorScheduleComponent },
  { path: 'doctors-list', component: DoctorsListComponent },
  { path: 'doctor-profile', component: DoctorProfileComponent },
  { path: 'doctor-profile-edit', component: DoctorProfileEditComponent },
 { path: 'auth-callback', component: AuthCallbackDirective },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }