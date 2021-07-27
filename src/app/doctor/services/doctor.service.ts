import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import Doctor from '../models/doctor.model';

const API_URL = 'https://localhost:44384/api/';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http: HttpClient) { }

  getDoctors(): Observable<Array<Doctor>> {
    return this.http.get<Array<Doctor>>(API_URL + "Doctors");
  }

  getDoctorById(id: string): Observable<Doctor> {
    return this.http.get<Doctor>(API_URL + "Doctors/" + id);
  }

  putDoctorProfileById(id: string, doctor: Doctor): Observable<Doctor>{
    return this.http.put<Doctor>(API_URL + "Doctors/" + id, doctor);
  }
}