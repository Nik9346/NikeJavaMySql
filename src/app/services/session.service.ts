import { Injectable } from '@angular/core';
import { IShoes, IShoesDb, IShoesSelected } from '../models/shoes-interface.models';
import { elementAt } from 'rxjs';
import { CartService } from './cart.service';
import { ShoesService } from './shoes.service';
import { ITagliaDb } from '../models/taglia.interface';
import { IShoesCartDb, IShoesItemAddToCart } from '../models/cart.inteface';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private shoesService: ShoesService) { }

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

  addItem(shoesAddToCart: IShoesItemAddToCart): void {
    let cartSaveInSession: IShoesItemAddToCart[] = this.getItem("carrello:")
    if (cartSaveInSession == null) {
      let shoesCartItemArray: IShoesItemAddToCart[] = [shoesAddToCart];
      sessionStorage.setItem("carrello:", JSON.stringify(shoesCartItemArray));
    } else {
      let shoesCartItemArray: IShoesItemAddToCart[] = []
      cartSaveInSession.forEach((element) => {
        shoesCartItemArray.push(element)
      })
      shoesCartItemArray.push(shoesAddToCart)
      sessionStorage.setItem("carrello:", JSON.stringify(shoesCartItemArray));
    }
  }

  removeItemCart(shoes: IShoesCartDb): void {
    let cartSaveInSession: IShoesCartDb[] = this.getItem("carrello:")
    let index = cartSaveInSession.indexOf(shoes);
    cartSaveInSession.splice(index, 1);
    sessionStorage.setItem("carrello:", JSON.stringify(cartSaveInSession));
    if (cartSaveInSession.length <= 0) {
      this.removeSession("carrello:");
    }
  }

  getItem(key: string): any {
    let cartSavedInSession = sessionStorage.getItem(key)
    return cartSavedInSession ? JSON.parse(cartSavedInSession) : null;
  }
  removeSession(key: string) {
    sessionStorage.removeItem(key);
  }

  updateItem(shoesAddToCart: IShoesItemAddToCart): void {
    let cartSaveInSession: IShoesItemAddToCart[] = this.getItem("carrello:")
    let newCartSaveInSession: IShoesItemAddToCart[];
    let newSize: ITagliaDb
    this.shoesService.getTagliaByNumber(+shoesAddToCart.taglia).subscribe((res)=>{
      newSize = res
      if (cartSaveInSession && newSize) {
        newCartSaveInSession = cartSaveInSession.map((scarpa => {
          if (scarpa.scarpa.id === shoesAddToCart.scarpa.id) return {
            ...scarpa,
            quantita : +shoesAddToCart.quantita,
            taglia : {id:newSize.id}
          }
          return scarpa;
        })
      )
    }
    sessionStorage.setItem("carrello:",JSON.stringify(newCartSaveInSession));
    })
  }

}
