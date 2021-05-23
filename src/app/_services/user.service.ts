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
    return this.http.get<User[]>("https://localhost:44384/api/Patients");
  }

  getPatientById(id: string): Observable<User> {
    return this.http.get<User>("https://localhost:44384/api/Patients/" + id);
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