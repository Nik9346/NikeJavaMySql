import { Injectable } from '@angular/core';
import { IShoesSelected } from '../models/shoes-interface.models';
import { IOrderData } from '../models/orderData-interface.models';

@Injectable({
  providedIn: 'root'
})
export class LocalWebsaveService {

  orderNumber: number = null

  constructor() { }

  setToken(token: string): void {
    localStorage.setItem('token', token)
  }

  getToken(): string | null {
    return localStorage.getItem('token')
  }
  removeToken(): void {
    localStorage.removeItem('token')
  }

  // Inizializzo un array vuoto per i prodotti salvati nel locale storage, interrogo ls e se c'è già un array lo assegno all'array inizializzato, poi aggiungo altri ordini e risalvo l'array nel local storage
  saveData(userId: string, ordine) {
    let itemSavedJson = []
    const itemSavedString = localStorage.getItem(`orderedProducts_${userId}`)
    if(itemSavedString){
      itemSavedJson =  JSON.parse(itemSavedString)
    }
    itemSavedJson.push(ordine)
    console.log(itemSavedJson);
    const newItemUpdateArrayString = JSON.stringify(itemSavedJson)
    localStorage.setItem(`orderedProducts_${userId}`, newItemUpdateArrayString)
    console.log('sto salvando');

  }
  // con questa funzione recupero i dati salvati nel locale storage
  getData(userId: string){
    const shoesOrderString = localStorage.getItem(`orderedProducts_${userId}`)
    const ShoesOrder = JSON.parse(shoesOrderString)
    console.log(ShoesOrder);
  }

  // vecchia funzione utilizzata per recuperare gli elementi salvati nel local storage passando l'userid, restituisce un array di scarpe in quanto inizialmente salvavo nel local storage solo il prodotto ordinato
  getOrderedProductByUserId(userId: string): IOrderData[] {
    const shoesOrederedString = localStorage.getItem(`orderedProducts_${userId}`)
    const ordereProduct: IOrderData[] = JSON.parse(shoesOrederedString)
    console.log(ordereProduct);
    return ordereProduct
  }

}
