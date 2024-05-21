import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false

  constructor(private httprequest:HttpClient) { }

  register(credential){
    console.log(credential);
    
    return this.httprequest.post("http://localhost:3000/register", credential)
  }
  login(loginData){{
    return this.httprequest.post("http://localhost:3000/login",loginData)
  }}

  isAuthenticated(){
    return this.isLoggedIn
  }
}
