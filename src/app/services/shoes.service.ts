import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IShoes, IShoesDb, IShoesDbForSave, IShoesSelected } from '../models/shoes-interface.models';
import { Observable } from 'rxjs';
import { ICategory } from '../models/category.interface';
import { NgIf } from '@angular/common';
import { IColor, IcolorDb } from '../models/color.interface';
import { ITagliaDb } from '../models/taglia.interface';
import { IShoesCartDb } from '../models/cart.inteface';
import { IUtenteDb } from '../models/login-interface.models';
import { IAddressDb } from '../models/address.interface';


@Injectable({
  providedIn: 'root'
})
export class ShoesService {

  shoes: IShoes[] = [];
  IsOvered: boolean = false
  shoesNewA: IShoes[] = []
  shoesSelectedArray: IShoesCartDb[] = []
  subtotal: number
  delivery: string
  total: number
  nome: string
  cognome: string
  indirizzo: string
  civico: string
  citta: string
  paese: string
  telefono: string
  cap: string
  email: string
  user: string
  id: string


  utente: IUtenteDb
  indirizzoDb: IAddressDb

  testUrlRequest: string = "http://localhost:8080/";
  deployUrl: string = "https://json-server-nikeangular.onrender.com/"
  test: boolean = true

  constructor(private httprequest: HttpClient) { }

  // ***CHIAMATE RELATIVE ALLA SCARPA***
  // Chiamata per ottenere tutte le scarpe
  getShoes(): Observable<any> {
    //return this.httprequest.get("https://json-server-nikeangular.onrender.com/prodotti")
    return this.httprequest.get("http://localhost:8080/scarpe/get")
  }
  //Chiamata per salvare la nuova scarpa nel database
  postShoes(scarpa: IShoesDbForSave) {
    return this.httprequest.post(`${this.test ? this.testUrlRequest : this.deployUrl}scarpe/add`, scarpa)
  }
  //  Chiamata utilizzata per restituire la scarpa selezionata in base all'id
  getShoesById(shoesId: number): Observable<any> {
    // return this.httprequest.get(`https://json-server-nikeangular.onrender.com/prodotti/${shoesId}`)
    return this.httprequest.get(`${this.test ? this.testUrlRequest : this.deployUrl}scarpe/get/scarpa/${shoesId}`)
  }


  //***CHIAMATE RELATIVE ALLA CATEGORIA***/
  //chiamate per ottenere e salvare nuove categorie
  getCategory(): Observable<any> {
    return this.httprequest.get(`${this.test ? this.testUrlRequest : this.deployUrl}categorie/get`)
  }
  //Chiamata per salvare una nuova categoria
  postCategory(categoria: ICategory) {
    return this.httprequest.post(`${this.test ? this.testUrlRequest : this.deployUrl}categorie/add`, categoria);
  }
  // Chiamata per ottenere tutte le scarpe filtrate per categoria
  getShoesByCat(shoesCategory: string): Observable<any> {
    // return this.httprequest.get(`https://json-server-nikeangular.onrender.com/prodotti?categoria=${shoesCategory}`)
    return this.httprequest.get(`${this.test ? this.testUrlRequest : this.deployUrl}scarpe/get/${shoesCategory}`)
  }
  // Chiamata per ottenere tutte le scarpe filtrate per la chiave nuovi arrivi
  getNewShoes(nuovo_arrivo: boolean): Observable<any> {
    // return this.httprequest.get(`https://json-server-nikeangular.onrender.com/prodotti?nuovo_arrivi=${nuovo_arrivo}`)
    return this.httprequest.get(`${this.test ? this.testUrlRequest : this.deployUrl}scarpe/get/nuoviArrivi/${nuovo_arrivo}`)
  }

  //***CHIAMATE RELATIVE AI COLORI***
  //chiamate per ottenere e salvare nuovi colori
  getColor(): Observable<any> {
    return this.httprequest.get("http://localhost:8080/colore/get")
  }
  //Chiamata per ottenere i dati del colore completo passando il nome dei colori
  getColorByColorName(colorName: string): Observable<any> {
    return this.httprequest.get(`${this.test ? this.testUrlRequest : this.deployUrl}colore/get/colore/${colorName}`)
  }
  //chiamata per salvare i nuovi colori nel database
  postColori(colori: IcolorDb[]) {
    return this.httprequest.post(`${this.test ? this.testUrlRequest : this.deployUrl}colore/add`, colori)
  }

  //***CHIAMATE RELATIVE ALLE TAGLIE***/
  //chiamate per ottenere tutte le taglie
  getTaglia(): Observable<any> {
    return this.httprequest.get(`${this.test ? this.testUrlRequest : this.deployUrl}taglia/get`)
  }
  //Chiamata per ottenere la taglia completa passando il numero
  getTagliaByNumber(numeroTaglia: number): Observable<any> {
    return this.httprequest.get(`${this.test ? this.testUrlRequest : this.deployUrl}taglia/get/${numeroTaglia}`)
  }
  //Chiamata per salvare le taglie nel database
  postTaglie(taglie: ITagliaDb[]) {
    return this.httprequest.post(`${this.test ? this.testUrlRequest : this.deployUrl}taglia/addSizes`, taglie)
  }

//***FUNZIONI UTILIZZATE ALL'INIZIO DEL PROGETTO***
  // Questa funzione è stata utilizzata all'inizio del progetto per popolare il campo immagine di ogni scarpa
  addImgShoes(shoesId: number, imgUrl: string): Observable<any> {
    return this.httprequest.patch<any>(`http://localhost:3000/prodotti/${shoesId}`, { immagine: imgUrl })
  }
  // Questa funzine è stata utilizzata all'inizio del progetto per popolare il campo nuovo arrivo e best seller random
  addBestNew(shoesId: number): Observable<any> {
    return this.httprequest.patch<any>(`http://localhost:3000/prodotti/${shoesId}`, { best_seller: this.getRandomArbitrary(), nuovo_arrivi: this.getRandomNewArrival() })
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
