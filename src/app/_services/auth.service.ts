import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'https://localhost:44384/api/Auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {

    return this.http.post(AUTH_API + 'SignIn', {
      email,
      password
    }, httpOptions);
  }

  register(email: string, password: string, passwordConfirm: string): Observable<any> {
    
    return this.http.post(AUTH_API + 'SignUp', {
      email,
      password,
      passwordConfirm
    }, httpOptions);
  }
}