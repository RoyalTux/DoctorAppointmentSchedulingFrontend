import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { PatientScheduleComponent } from './patient-schedule/patient-schedule.component';
import { DoctorScheduleComponent } from './doctor-schedule/doctor-schedule.component';
import { DoctorsListComponent } from './doctors-list/doctors-list.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile-edit', component: ProfileEditComponent },
  { path: 'patient-schedule', component: PatientScheduleComponent },
  { path: 'doctor-schedule', component: DoctorScheduleComponent },
  { path: 'doctors-list', component: DoctorsListComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }