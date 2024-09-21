import { AfterViewInit, Component } from '@angular/core';
import { IShoesSelected } from '../../models/shoes-interface.models';
import { ShoesService } from '../../services/shoes.service';
import { LocalWebsaveService } from '../../services/local-websave.service';
import { AuthService } from '../../services/auth.service';
import { DataPostService } from '../../services/data-post.service';
import { SessionService } from '../../services/session.service';
import { CartService } from '../../services/cart.service';
import { ITagliaDb } from '../../models/taglia.interface';
import { IShoesCartDb, IShoesItemAddToCart } from '../../models/cart.inteface';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.sass'
})
export class CartPageComponent implements AfterViewInit {

  cartShoesItem: IShoesCartDb[] = []
  selectedQuantity: number = 1
  deliveryCost: string
  totaPrice: number
  isLoggedIn: boolean
  accessKey: string
  idUser: string
  orderNumber: number = null
  user: string


  constructor(private shoesService: ShoesService, private sessionService: SessionService, private localeStorage: LocalWebsaveService, private authService: AuthService, private dataService: DataPostService, private cartService: CartService) {
    // this.cartShoesItem = this.shoesService.shoesSelectedArray commentato perchè faccio chiamata al db per ottenere carrello
    this.isLoggedIn = this.authService.isLoggedIn
  }

  ngAfterViewInit(): void {
    
    if (this.isLoggedIn) {
      this.user = this.shoesService.user
      this.accessKey = this.localeStorage.getToken()
      this.idUser = this.shoesService.id
      this.cartService.getCartItem().subscribe((res)=>{
        this.cartShoesItem = res
        this.shoesService.shoesSelectedArray = this.cartShoesItem
      })
    } else {
      this.cartSessionControl()
    }
  }
  update(s: IShoesCartDb) {
    this.sessionService.updateItem(s)
    if (this.isLoggedIn) {
      let shoesUpdateDb: IShoesItemAddToCart
      if (this.authService.isLoggedIn) {
        let newSize: ITagliaDb
        this.shoesService.getTagliaByNumber(+s.taglia).subscribe((res) => {
          newSize = res
          shoesUpdateDb = {
            id: s.id,
            scarpa: {id:s.scarpa.id},
            colore: null,
            taglia: { id: newSize.id },
            quantita: +s.quantita
          }
          if (shoesUpdateDb)
            this.cartService.updateCartItem(shoesUpdateDb).subscribe((res) => {
            })
        })
      }
    }
  }

  // Calcolo e conversione delle spese di spedizione
  deliveryCosts() {
    if (this.getSubtotal() <= 150) {
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
      subtotal += element.scarpa.prezzo * element.quantita
    })
    return subtotal
  }

  // Funzione utilizzata per la rimozione dell'elemento dall'array del carrello
  removeItem(s: IShoesCartDb) {
    if (this.isLoggedIn) {
      const indexOfItem = this.shoesService.shoesSelectedArray.indexOf(s);
      if (indexOfItem > -1)
        this.shoesService.shoesSelectedArray.splice(indexOfItem, 1)
      this.cartShoesItem = this.shoesService.shoesSelectedArray
      this.cartService.removeItemCart(s.id).subscribe();
    }
    this.sessionService.removeItemCart(s);
    const indexOfItem = this.cartShoesItem.indexOf(s)
    this.cartShoesItem.splice(indexOfItem, 1)
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
    //Funzione utilizzata per dialogare con il vecchio server Json
    // this.dataService.postData(this.localeStorage.getToken(), order).subscribe()
  }

  // Funzione utilizzata per generare un numero random utilizzato per il numero ordine
  generaNumOrd(): number {
    return Math.floor(Math.random() * (999999 - 100000 + 1) + 100000)
  }
  // Funzione utilizzata per aggiornare il valore del numero ordine
  updateOrderArray(): void {
    const orderNumber = this.generaNumOrd()
    if (orderNumber) {
      this.localeStorage.orderNumber = orderNumber
      this.orderNumber = orderNumber
    }
  }
  // Funzione utilizzata per il logout
  logout() {
    this.isLoggedIn = false
    this.authService.isLoggedIn = !this.authService.isLoggedIn
    localStorage.removeItem("token")
    sessionStorage.removeItem("utente:")
    sessionStorage.removeItem("carrello:")
  }

  cartSessionControl(): void {
    const savedStorage = this.sessionService.getItem("carrello:");
    if (savedStorage) {
      savedStorage.forEach((element) => {
        this.cartService.getCartItemNotLogged(element).subscribe((res) => {
          this.cartShoesItem.push(res)
        })
      })
    }
  }
}

