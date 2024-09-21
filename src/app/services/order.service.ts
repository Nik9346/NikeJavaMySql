import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { IOrderDb } from '../models/orderData-interface.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  testUrlRequest: string = "http://localhost:8080/";
  deployUrl: string = "https://json-server-nikeangular.onrender.com/"
  test: boolean = true
  

  constructor(private httprequest: HttpClient, private authService: AuthService) { }


  sendOrder(order:IOrderDb): Observable<any> {
    if (this.authService.isLoggedIn) {
      return this.httprequest.post(`${this.test ? this.testUrlRequest : this.deployUrl}ordine/addOrder`, order, { withCredentials: true })
    }
  }
}
