import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import User from '../_models/user';

const API_URL = 'https://localhost:44384/api/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getPatients(): Observable<User[]> {
    return this.http.get<User[]>(API_URL + "Patients");
  }

  getDoctors(): Observable<User[]> {
    return this.http.get<User[]>(API_URL + "Doctors");
  }

  getPatientById(id: string): Observable<User> {
    return this.http.get<User>(API_URL + "Patients/" + id);
  }

  getDoctorById(id: string): Observable<User> {
    return this.http.get<User>(API_URL + "Doctors/" + id);
  }

  putPatientProfileById(id: string, patient: User): Observable<User>{
    return this.http.put<User>(API_URL + "Patients/" + id, patient);
  }

  putDoctorProfileById(id: string, doctor: User): Observable<User>{
    return this.http.put<User>(API_URL + "Doctors/" + id, doctor);
  }

  // getPublicContent(): Observable<any> {

  //   return this.http.get(API_URL + 'all', { responseType: 'text' });
  // }

  // getPatientSchedule(): Observable<any> {

  //   return this.http.get(API_URL + 'user', { responseType: 'text' });
  // }

  // getDoctorSchedule(): Observable<any> {
    
  //   return this.http.get(API_URL + 'admin', { responseType: 'text' });
  // }
}