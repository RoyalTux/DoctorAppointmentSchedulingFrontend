import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'https://localhost:44384/api/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // getPublicContent(): Observable<any> {

  //   return this.http.get(API_URL + 'all', { responseType: 'text' });
  // }

  // getPatientSchedule(): Observable<any> {

  //   return this.http.get(API_URL + 'user', { responseType: 'text' });
  // }

  // getDoctorSchedule(): Observable<any> {
    
  //   return this.http.get(API_URL + 'admin', { responseType: 'text' });
  // }

  // postPatientProfile(
  //   token: string,
  //   firstName: string,
  //   lastName: string,
  //   country: string,
  //   city: string,
  //   bio: string,
  //   phoneNumber: string,
  //   id: string,
  //   address: string): Observable<any> {
  //     debugger;
  //   return this.http.post(API_URL + 'Patients', {
  //     firstName,
  //     lastName,
  //     country,
  //     city,
  //     bio,
  //     phoneNumber,
  //     id,
  //     address
  //   }, {
  //     headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` })
  //   });
  // }
}