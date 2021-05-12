import { Injectable } from '@angular/core';
import { Doctor } from '../_models/doctor';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    console.log(token);
  }

  public getToken(): string | null {

    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user_token: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user_token));
  }

  public getUser(): any {
    let user_data: Doctor = new Doctor();

    let user_token = window.sessionStorage.getItem(USER_KEY);

    let jwtData = user_token!.split('.')[1];
    let decodedJwtJsonData = window.atob(jwtData)
    let decodedJwtData = JSON.parse(decodedJwtJsonData);

    let name: string = decodedJwtData.name;
    let role: string = decodedJwtData.role;

    if (name && role) {
      user_data.email = name;
      user_data.role = role;

      // return JSON.parse(user);
      return user_data;
    }

    return {};
  }
}