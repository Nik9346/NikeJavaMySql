import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IShoes, IShoesSelected } from '../models/shoes-interface.models';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShoesService {

  shoes: IShoes[] = [];
  IsOvered: boolean = false
  shoesNewA: IShoes[] = []
  shoesSelectedArray: IShoesSelected[] = []
  subtotal: number
  delivery: string
  total: number
  nome: string
  cognome: string
  indirizzo: string
  citta: string
  paese: string
  telefono: string
  cap: string
  email: string
  user: string
  id:string
  

  constructor(private httprequest: HttpClient) {}

  // Chiamata per ottenere tutte le scarpe
  getShoes(): Observable<any> {
    // return this.httprequest.get("http://localhost:3000/prodotti")
    // return this.httprequest.get("http://casavergari.ns0.it:3000/prodotti")
    return this.httprequest.get("https://json-server-nikeangular.onrender.com/prodotti")
    // return this.httprequest.get("http://localhost:8080/scarpe/get")
  }
  // Chiamata per ottenere tutte le scarpe filtrate per categoria
  getShoesByCat(shoesCategory:string):Observable<any>{
    // return this.httprequest.get(`http://localhost:3000/prodotti?categoria=${shoesCategory}`)
    return this.httprequest.get(`https://json-server-nikeangular.onrender.com/prodotti?categoria=${shoesCategory}`)
  }
  // Chiamata per ottenere tutte le scarpe filtrate per la chiave nuovi arrivi
  getNewShoes(nuovo_arrivo:boolean):Observable<any>{
    // return this.httprequest.get(`http://localhost:3000/prodotti?nuovo_arrivi=${nuovo_arrivo}`)
    return this.httprequest.get(`https://json-server-nikeangular.onrender.com/prodotti?nuovo_arrivi=${nuovo_arrivo}`)
  }
//  Chiamata utilizzata per restituire la scarpa selezionata in base all'id
  getShoesById(shoesId: number): Observable<any> {
    // return this.httprequest.get(`http://localhost:3000/prodotti/${shoesId}`)
    return this.httprequest.get(`https://json-server-nikeangular.onrender.com/prodotti/${shoesId}`)
    // return this.httprequest.get(`http://casavergari.ns0.it:3000/prodotti/${shoesId}`)
  }
  // Questa funzione è stata utilizzata all'inizio del progetto per popolare il campo immagine di ogni scarpa
  addImgShoes(shoesId: number, imgUrl: string): Observable<any> {
    return this.httprequest.patch<any>(`http://localhost:3000/prodotti/${shoesId}`, { immagine: imgUrl })
    // return this.httprequest.patch<any>(`http://casavergari.ns0.it:3000/prodotti/${shoesId}`,{immagine:imgUrl})
  }
  // Questa funzine è stata utilizzata all'inizio del progetto per popolare il campo nuovo arrivo e best seller random
  addBestNew(shoesId: number): Observable<any> {
    return this.httprequest.patch<any>(`http://localhost:3000/prodotti/${shoesId}`, { best_seller: this.getRandomArbitrary(), nuovo_arrivi: this.getRandomNewArrival() })
    // return this.httprequest.patch<any>(`http://casavergari.ns0.it:3000/prodotti/${shoesId}`,{best_seller:this.getRandomArbitrary(),nuovo_arrivi:this.getRandomNewArrival()})
  }
  // Funzione utilizzata per popolare il campo best seller con valori random da 1 a 5
  getRandomArbitrary(): number {
    return Math.floor(Math.random() * 6);
  }
// Funzione utilizzata per popolare il campo nuovo arrivo con valori random booleani
  getRandomNewArrival(): boolean {
    const numberRandom = Math.floor(Math.random() * 2)
    if (numberRandom == 1) {
      return false
    } else {
      return true
    }
  }
  
// Questa funzione è stata utilizzata per Ricercare su google le immagini in base al nome della scarpa
  searchImages(query: string): Observable<any> {
    const apiKey = 'AIzaSyAxUh-9fUkOkBoVnMiFH5zZ2ZgKk6Ol67o';
    const cx = 'a32cc6617c19c49f6';
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${query}&searchType=image`;
    const urlRestricted = `https://www.googleapis.com/customsearch/v1/siterestrict?key=${apiKey}&cx=${cx}&q=${query}&searchType=image`
    return this.httprequest.get(url)
  }
  
}
