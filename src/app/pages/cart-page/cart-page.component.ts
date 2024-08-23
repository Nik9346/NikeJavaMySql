import { AfterViewInit, Component } from '@angular/core';
import { IShoesSelected } from '../../models/shoes-interface.models';
import { ShoesService } from '../../services/shoes.service';
import { LocalWebsaveService } from '../../services/local-websave.service';
import { AuthService } from '../../services/auth.service';
import { DataPostService } from '../../services/data-post.service';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.sass'
})
export class CartPageComponent implements AfterViewInit {

  cartShoesItem: IShoesSelected[] =  []
  selectedQuantity: number = 1
  deliveryCost: string
  totaPrice: number
  isLoggedIn: boolean
  accessKey: string
  idUser: string
  orderNumber: number = null
  user: string
  

  constructor(private shoesService: ShoesService, private sessionService: SessionService, private localeStorage: LocalWebsaveService, private authService: AuthService, private dataService : DataPostService) {
    // this.cartShoesItem = this.shoesService.shoesSelectedArray
    // this.cartShoesItem.forEach((element) => {
    //   element.quantita = this.selectedQuantity
    // })
  }

  ngAfterViewInit(): void {
    const savedStorage = this.sessionService.getItem("carrello:");
    this.cartShoesItem = savedStorage;
    this.cartShoesItem.forEach((element) => {
      element.quantita = this.selectedQuantity
    })
    this.isLoggedIn = this.authService.isLoggedIn
    if (this.isLoggedIn) {
      this.user = this.shoesService.user
      this.accessKey = this.localeStorage.getToken()
      this.idUser = this.shoesService.id
    }
  }

  // Calcolo e conversione delle spese di spedizione
  deliveryCosts() {
    if (this.getSubtotal() <= 100) {
      this.deliveryCost = '7.50'
    } else {
      this.deliveryCost = '0'
      if (this.deliveryCost == '0') {
        return this.deliveryCost = 'Gratis'
      }
    }
    return this.deliveryCost
  }

  // Calcolo del subtotale
  getSubtotal(): number {
    let subtotal = 0
    this.cartShoesItem.forEach((element) => {
      subtotal += element.prezzo * element.quantita
    })
    return subtotal
  }
  
  // Funzione utilizzata per la rimozione dell'elemento dall'array del carrello
  removeItem(s: IShoesSelected) {
    this.sessionService.removeItemCart(s);
    this.cartShoesItem = this.sessionService.getItem("carrello:")
  }

  get subtotal(): number {
    return this.getSubtotal()
  }

  get total(): number {
    if (this.deliveryCost != 'Gratis') {
      return this.getSubtotal() + parseFloat(this.deliveryCosts())
    } else {
      return this.getSubtotal()
    }
  }

  get delivery(): string {
    return this.deliveryCosts()
  }
  
  // Funzione utilizzata per fare l'upload dei dati all'interno del service e utilizzarli poi nella pagina di pagamento se l'utente non è loggato
  dataUpdate() {
    this.shoesService.subtotal = this.subtotal
    this.shoesService.total = this.total
    this.shoesService.delivery = this.delivery
  }
// quando l'utente è loggato la funzione utilizzata sul pulsante procedi al pagamento è questa, passo i dati al service, genero un numero di ordine random, creo un oggetto in cui inserisco ordine numero e prodotti ordinati, e salvo il tutto nel locale storage
  dataUpdateLogged() {
    this.shoesService.subtotal = this.subtotal
    this.shoesService.total = this.total
    this.shoesService.delivery = this.delivery
    this.updateOrderArray()
    const order = {
      userId: this.idUser,
      orderNumber: this.orderNumber,
      orderItem: this.cartShoesItem
    }
    // Utilizzavo questa funzione per salvare i dati nel local storage
    // this.localeStorage.saveData(this.idUser,order)
    this.dataService.postData(this.localeStorage.getToken(),order).subscribe()
  }
  
// Funzione utilizzata per generare un numero random utilizzato per il numero ordine
  generaNumOrd():number{
    return Math.floor(Math.random()*(999999 - 100000 +1) + 100000)
  }
// Funzione utilizzata per aggiornare il valore del numero ordine
  updateOrderArray():void{
    const orderNumber = this.generaNumOrd()
    if(orderNumber){
      this.localeStorage.orderNumber = orderNumber
      this.orderNumber = orderNumber
    }
  }
  // Funzione utilizzata per il logout
  logout(){
    this.isLoggedIn = false
    this.authService.isLoggedIn = !this.authService.isLoggedIn
  }
}

