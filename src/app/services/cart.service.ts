import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { IShoesCartDb, IShoesItemAddToCart } from '../models/shoes-interface.models';
import { SessionService } from './session.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  testUrlRequest : string = "http://localhost:8080/";
  deployUrl : string = "https://json-server-nikeangular.onrender.com/"
  test: boolean = true

  constructor(private httprequest:HttpClient, private authService: AuthService, private sessionService: SessionService) { }


  getCart():Observable<any>{
    if(this.authService.isLoggedIn){
      return this.httprequest.get(`${this.test ? this.testUrlRequest:this.deployUrl}CartItem/listAll`,{withCredentials:true})
    }
    sessionStorage.getItem("carrello:")
  }
  getCartItemNotLogged(scarpaCarrello:IShoesCartDb):Observable<any>{
    return this.httprequest.get(`${this.test ? this.testUrlRequest:this.deployUrl}CartItem/getCart/${scarpaCarrello.scarpa.id}/${scarpaCarrello.colore.id}/${scarpaCarrello.taglia.id}`);
  }

  saveItemCart(shoesToAddCart:IShoesItemAddToCart|IShoesCartDb):Observable<any>{
    if(this.authService.isLoggedIn){
      return this.httprequest.post(`${this.test ? this.testUrlRequest:this.deployUrl}CartItem/add`,shoesToAddCart ,{withCredentials:true});
    }
    this.sessionService.addItem(shoesToAddCart);
  }
  removeItemCart(indexOfItem: number){
    return this.httprequest.delete(`${this.test ? this.testUrlRequest:this.deployUrl}CartItem/remove/${indexOfItem}`, {withCredentials:true})
  }

  
}
