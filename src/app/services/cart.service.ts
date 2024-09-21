import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { SessionService } from './session.service';
import { Observable } from 'rxjs';
import { ShoesService } from './shoes.service';
import { ITagliaDb } from '../models/taglia.interface';
import { IShoesCartDb, IShoesItemAddToCart } from '../models/cart.inteface';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  testUrlRequest: string = "http://localhost:8080/";
  deployUrl: string = "https://json-server-nikeangular.onrender.com/"
  test: boolean = true

  constructor(private httprequest: HttpClient, private authService: AuthService, private sessionService: SessionService, private shoesService: ShoesService) { }

  getCart(idUtente: number){
    if(this.authService.isLoggedIn){
      return this.httprequest.get(`${this.test ? this.testUrlRequest : this.deployUrl}cart/get/${idUtente}`, { withCredentials: true })
    }
  }

  getCartVerify(idUtente: number){
    if(this.authService.isLoggedIn){
      return this.httprequest.get(`${this.test ? this.testUrlRequest : this.deployUrl}cart/getCartVerify/${idUtente}`, { withCredentials: true })
    }
  }

  getCartItem(): Observable<any> {
    if (this.authService.isLoggedIn) {
      return this.httprequest.get(`${this.test ? this.testUrlRequest : this.deployUrl}CartItem/listAll`, { withCredentials: true })
    }
    sessionStorage.getItem("carrello:")
  }
  getCartItemNotLogged(scarpaCarrello: IShoesItemAddToCart): Observable<any> {
    return this.httprequest.get(`${this.test ? this.testUrlRequest : this.deployUrl}CartItem/getCart/${scarpaCarrello.scarpa.id}/${scarpaCarrello.colore.id}/${scarpaCarrello.taglia.id}`);
  }

  saveItemCart(shoesToAddCart: IShoesItemAddToCart | IShoesCartDb): Observable<any> {
    if (this.authService.isLoggedIn) {
      return this.httprequest.post(`${this.test ? this.testUrlRequest : this.deployUrl}CartItem/add`, shoesToAddCart, { withCredentials: true });
    }
    this.sessionService.addItem(shoesToAddCart);
  }
  removeItemCart(indexOfItem: number) {
    return this.httprequest.delete(`${this.test ? this.testUrlRequest : this.deployUrl}CartItem/remove/${indexOfItem}`, { withCredentials: true })
  }

  updateCartItem(shoesUpdateCart: IShoesItemAddToCart | IShoesCartDb): Observable<any> {
    return this.httprequest.put(`${this.test ? this.testUrlRequest : this.deployUrl}CartItem/update`, shoesUpdateCart, { withCredentials: true });

  }



}
