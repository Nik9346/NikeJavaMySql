import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { IShoesCartDb, IShoesItemAddToCart } from '../models/shoes-interface.models';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  testUrlRequest : string = "http://localhost:8080/";
  deployUrl : string = "https://json-server-nikeangular.onrender.com/"
  test: boolean = true

  constructor(private httprequest:HttpClient, private authService: AuthService, private sessionService: SessionService) { }


  getCart(){
    if(this.authService.isLoggedIn){
      return this.httprequest.get(`${this.test ? this.testUrlRequest:this.deployUrl}CartItem/ListAll`,{withCredentials:true})
    }
    return sessionStorage.getItem("carrello:")
  }
  saveItemCart(shoesToAddCart:IShoesItemAddToCart|IShoesCartDb){
    if(this.authService.isLoggedIn){
      console.log("Sono loggato e sto inviando i dati al db");
      
      return this.httprequest.post(`${this.test ? this.testUrlRequest:this.deployUrl}CartItem/add`,shoesToAddCart ,{withCredentials:true}).subscribe((response)=>{console.log(response);
      });
    }
    return this.sessionService.addItem(shoesToAddCart);
  }

  
}
