import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Patient from '../models/patient.model';

const API_URL = 'https://localhost:44384/api/';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }

  getPatients(): Observable<Array<Patient>> {
    return this.http.get<Array<Patient>>(API_URL + "Patients");
  }

  getPatientById(id: string): Observable<Patient> {
    return this.http.get<Patient>(API_URL + "Patients/" + id);
  }

  putPatientProfileById(id: string, patient: Patient): Observable<Patient>{
    return this.http.put<Patient>(API_URL + "Patients/" + id, patient);
  }
}