import { Injectable } from '@angular/core';
import { IShoes, IShoesSelected } from '../models/shoes-interface.models';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  setItem(shoesInCart: IShoesSelected[]): void {
    let cartSaveInSession: IShoesSelected[] = this.getItem("carrello:")
    if (cartSaveInSession == null) {
      sessionStorage.setItem("carrello:", JSON.stringify(shoesInCart));
    } else {
      cartSaveInSession.forEach((element) => {
        shoesInCart.push(element)
      })
      sessionStorage.setItem("carrello:", JSON.stringify(shoesInCart));
    }
  }
  removeItemCart(shoes: IShoes): void {
    let cartSaveInSession: IShoesSelected[] = this.getItem("carrello:")
    console.log(shoes);
    let index = cartSaveInSession.indexOf(shoes);
    cartSaveInSession.splice(index,1);
    console.log(cartSaveInSession);
    sessionStorage.setItem("carrello:", JSON.stringify(cartSaveInSession));
    if(cartSaveInSession.length<=0){
      this.removeSession("carrello:");
    }
  }

  getItem(key: string): any {
    const value = sessionStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }
  removeSession(key:string){
    sessionStorage.removeItem(key);
  }
}
