import { Injectable } from '@angular/core';
import { IShoes, IShoesCartDb, IShoesDb, IShoesItemAddToCart, IShoesSelected } from '../models/shoes-interface.models';
import { elementAt } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  setItem(shoesInCart: IShoesCartDb[]): void {
    let cartSaveInSession: IShoesCartDb[] = this.getItem("carrello:")
    if (cartSaveInSession == null) {
      sessionStorage.setItem("carrello:", JSON.stringify(shoesInCart));
    } else {
      cartSaveInSession.forEach((element) => {
        shoesInCart.push(element)
      })
      sessionStorage.setItem("carrello:", JSON.stringify(shoesInCart));
    }
  }

  addItem(shoesAddToCart: IShoesItemAddToCart):void{
    let cartSaveInSession : IShoesItemAddToCart[] = this.getItem("carrello:")
    if(cartSaveInSession == null){
      let shoesCartItemArray : IShoesItemAddToCart[] = [shoesAddToCart];
      sessionStorage.setItem("carrello:",JSON.stringify(shoesCartItemArray));
    } else{
      let shoesCartItemArray : IShoesItemAddToCart[]= []
      cartSaveInSession.forEach((element) =>{
        shoesCartItemArray.push(element)
      })
      shoesCartItemArray.push(shoesAddToCart)
      sessionStorage.setItem("carrello:",JSON.stringify(shoesCartItemArray));
    }
  }

  removeItemCart(shoes: IShoesCartDb): void {
    let cartSaveInSession: IShoesCartDb[] = this.getItem("carrello:")
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
