import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { IPayment } from '../models/payment.interface';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  testUrlRequest: string = "http://localhost:8080/";
  deployUrl: string = "https://json-server-nikeangular.onrender.com/"
  test: boolean = true
  payment : IPayment;

  constructor(private httprequest: HttpClient, private authService: AuthService) { }


  //Funzione utilizzata per inviare il pagamento al db
  payOrder(payment : IPayment): Observable<any> {
    if (this.authService.isLoggedIn) {
      return this.httprequest.post(`${this.test ? this.testUrlRequest : this.deployUrl}pay/payOrder`, payment, { withCredentials: true })
    }
  }
}
