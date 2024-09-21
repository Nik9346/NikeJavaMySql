import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ShoesService } from '../../services/shoes.service';
import { IShoesSelected } from '../../models/shoes-interface.models';
import { AuthService } from '../../services/auth.service';
import { LocalWebsaveService } from '../../services/local-websave.service';
import { PaymentService } from '../../services/payment.service';
import { IPayment } from '../../models/payment.interface';
import { CartService } from '../../services/cart.service';
import { ICart, IShoesCartDb } from '../../models/cart.inteface';
import { IUtenteDb } from '../../models/login-interface.models';
import { IRisposta } from '../../models/rispostaDb.interface';
import { switchMap } from 'rxjs';
import { OrderService } from '../../services/order.service';
import { IOrderData, IOrderDb } from '../../models/orderData-interface.models';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-conferma-ordine',
  templateUrl: './conferma-ordine.component.html',
  styleUrl: './conferma-ordine.component.sass'
})

export class ConfermaOrdineComponent implements OnInit {

  total: number
  nome: string
  cognome: string
  indirizzo: string
  citta: string
  paese: string
  telefono: string
  email: string
  cap: string
  shoesOrdered: IShoesCartDb[]
  orderNumber: number = null
  isLoggedIn: boolean = false
  utente: IUtenteDb
  paymentMethod: IPayment;
  cart: ICart
  paymentComplete: boolean = false
  isLoading: boolean = false
  subtotal: number
  deliveryCosts: string
  order: IOrderDb
  triggerModal : boolean = false
  

  constructor(private shoesService: ShoesService,
    private authService: AuthService,
    private localeStorage: LocalWebsaveService,
    private paymentService: PaymentService,
    private cartService: CartService,
    private orderService: OrderService,
    private sessionService: SessionService,
  private router:Router) { }


  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn
    if (this.authService.isLoggedIn) {
      this.utente = this.shoesService.utente
      this.shoesOrdered = this.shoesService.shoesSelectedArray
      this.paymentMethod = this.paymentService.payment
      this.total = this.paymentMethod.importo
      this.deliveryCosts = this.shoesService.delivery
    }
    else {
      this.nome = this.shoesService.nome
      this.cognome = this.shoesService.cognome
      this.indirizzo = this.shoesService.indirizzo
      this.citta = this.shoesService.citta
      this.paese = this.shoesService.paese
      this.telefono = this.shoesService.telefono
      this.cap = this.shoesService.cap
      this.email = this.shoesService.email
      this.shoesOrdered = this.shoesService.shoesSelectedArray
      if (!this.isLoggedIn) {
        this.orderNumber = this.generaNumOrd()
        this.total = this.shoesService.total
      }
    }
  }
  
  showModal(){
    this.triggerModal = true
  }

  goToHomePage(){
    this.router.navigate(['home-page'])
  }
  // Funzione che prende tutti i dati dal service, se l'utente è loggato recupera anche il numero dell'ordine dal locale storage, altrimenti ne genera uno casuale

  // ngAfterViewInit() {
  //   this.total = this.shoesService.total
  //   this.nome = this.shoesService.nome
  //   this.cognome = this.shoesService.cognome
  //   this.indirizzo = this.shoesService.indirizzo
  //   this.citta = this.shoesService.citta
  //   this.paese = this.shoesService.paese
  //   this.telefono = this.shoesService.telefono
  //   this.cap = this.shoesService.cap
  //   this.email = this.shoesService.email
  //   this.shoesOrdered = this.shoesService.shoesSelectedArray
  //   this.isLoggedIn = this.authService.isLoggedIn
  //   if (!this.isLoggedIn) {
  //     this.orderNumber = this.generaNumOrd()
  //   } else {
  //     this.orderNumber = this.localeStorage.orderNumber
  //   }
  // }

  // ngAfterViewInit(): void {
  //     if(this.authService.isLoggedIn){
  //       this.nome = this.shoesService.nome
  //    this.cognome = this.shoesService.cognome
  //    this.indirizzo = this.shoesService.indirizzo
  //    this.citta = this.shoesService.citta
  //    this.paese = this.shoesService.paese
  //    this.cap = this.shoesService.cap
  //    this.shoesOrdered = this.shoesService.shoesSelectedArray
  //    this.paymentMethod = this.paymentService.payment
  //     }
  // }

  // Funzione utilizata per generare un numero d'ordine random
  generaNumOrd(): number {
    return Math.floor(Math.random() * (999999 - 100000 + 1) + 100000)
  }
  // Funzione utilizzata per svuotare il carrello una volta fatto l'ordine
  resetCart() {
    this.shoesService.shoesSelectedArray = []
  }

  sendOrderNotLogged(){
    this.isLoading = true
    this.shoesService.shoesSelectedArray = []
    this.sessionService.removeSession("carrello:")
    this.showModal()
    setTimeout(() => {
      this.isLoading = false
    }, 3000);
  }

  sendOrder() {
    this.isLoading = true;

    this.cartService.getCartVerify(this.utente.id).subscribe((res: ICart) => {
      const importoCart = res.importo
      let totaleCalcolato: number;
      if (this.deliveryCosts !== 'Gratis') {
        totaleCalcolato = +this.deliveryCosts + importoCart
      } else {
        totaleCalcolato = importoCart;
      }
      if (totaleCalcolato === this.total) {
        this.order = {
          importo: totaleCalcolato,
          indirizzo: this.utente.indirizzi[0],
          pagamento: this.paymentMethod,
          speseSpedizione: this.deliveryCosts !== "Gratis" ? +this.deliveryCosts : 0.0
        }
        this.orderService.sendOrder(this.order).subscribe((res: IRisposta) => {
          if (res.codice === 200) {
            setTimeout(() => {
              this.isLoading = false
              this.showModal()
            }, 1000);
          }
        }, (error) => {
          console.log(error);
          this.isLoading = false
        })
      } else {
        console.log("Totale calcolato non corrisponde");
        this.isLoading = false
      }
    }, (error) => {
      console.log("Errore durante la verifica del carrello", error);
      this.isLoading = false
    }
    )
  }
}
