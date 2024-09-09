import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProfiloUtenteDb, IUtenteDb } from '../models/login-interface.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false

  constructor(private httprequest:HttpClient) { }

  register(credential){
    // console.log(credential);
    
    // return this.httprequest.post("http://localhost:3000/register", credential)
    return this.httprequest.post("https://json-server-nikeangular.onrender.com/register", credential)
  }
  login(loginData){{
    // return this.httprequest.post("http://localhost:3000/login",loginData)
    return this.httprequest.post("https://json-server-nikeangular.onrender.com/login",loginData)
  }}
  isAuthenticated(){
    return this.isLoggedIn
  }
  registerDb(credential:IUtenteDb){
    return this.httprequest.post("http://localhost:8080/utente/registrazioneUtente",credential);
  }
  loginDb(credential:IProfiloUtenteDb){
    return this.httprequest.put("http://localhost:8080/utente/login", credential, {withCredentials:true});
  }
  logoutDb(token:String){
    return this.httprequest.delete(`http://localhost:8080/utente/logout/${token}`, {withCredentials:true})
  }
}
