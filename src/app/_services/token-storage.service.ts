import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  user_data = {};

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    console.log(token);
  }

  // public getToken(): string | null {

  //   return window.sessionStorage.getItem(TOKEN_KEY);
  // }

  public getToken(): string | null {

    return window.sessionStorage.getItem(USER_KEY);
  }

  public saveUser(user_token: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, user_token);
  }

  public getUser(): any {
  
    let user_token = window.sessionStorage.getItem(USER_KEY);
    let jwtData = user_token!.split('.')[1];
    let decodedJwtJsonData = window.atob(jwtData)
    let decodedJwtData = JSON.parse(decodedJwtJsonData);

    let name: string = decodedJwtData.name;
    let role: string = decodedJwtData.role;
    let sub: string = decodedJwtData.sub;

    if(name && role && sub){
      this.user_data['email'] = name;
      this.user_data['role'] = role;
      this.user_data['sub'] = sub;

      return this.user_data;
    }

    return {};
  }
}