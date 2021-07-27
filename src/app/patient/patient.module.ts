import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { PatientProfileEditComponent } from "./patient-profile-edit/patient-profile-edit.component";
import { PatientProfileComponent } from "./patient-profile/patient-profile.component";
import { PatientScheduleComponent } from "./patient-schedule/patient-schedule.component";

@NgModule({
  declarations: [
    PatientScheduleComponent,
    PatientProfileEditComponent,
    PatientProfileComponent
  ],
  imports: [
    FormsModule
  ]
})
export class PatientModule { }
