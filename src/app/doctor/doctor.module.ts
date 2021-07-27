import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { DoctorProfileEditComponent } from "./doctor-profile-edit/doctor-profile-edit.component";
import { DoctorProfileComponent } from "./doctor-profile/doctor-profile.component";
import { DoctorScheduleComponent } from "./doctor-schedule/doctor-schedule.component";
import { DoctorsListComponent } from "./doctors-list/doctors-list.component";

@NgModule({
  declarations: [
    DoctorScheduleComponent,
    DoctorsListComponent,
    DoctorProfileComponent,
    DoctorProfileEditComponent
  ],
  imports: [
      FormsModule
    ]
})
export class DoctorModule { }
