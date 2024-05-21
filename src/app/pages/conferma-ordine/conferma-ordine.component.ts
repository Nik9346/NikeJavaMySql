import { AfterViewInit, Component } from '@angular/core';
import { ShoesService } from '../../services/shoes.service';
import { IShoesSelected } from '../../models/shoes-interface.models';
import { AuthService } from '../../services/auth.service';
import { LocalWebsaveService } from '../../services/local-websave.service';

@Component({
  selector: 'app-conferma-ordine',
  templateUrl: './conferma-ordine.component.html',
  styleUrl: './conferma-ordine.component.sass'
})

export class ConfermaOrdineComponent implements AfterViewInit {

  total: number
  nome: string
  cognome: string
  indirizzo: string
  citta: string
  paese: string
  telefono: string
  cap: string
  email: string
  shoesOrdered: IShoesSelected[]
  orderNumber: number = null
  isLoggedIn: boolean

  constructor(private shoesService: ShoesService, private authService: AuthService, private localeStorage: LocalWebsaveService) { }
// Funzione che prende tutti i dati dal service, se l'utente è loggato recupera anche il numero dell'ordine dal locale storage, altrimenti ne genera uno casuale
  ngAfterViewInit() {
    this.total = this.shoesService.total
    this.nome = this.shoesService.nome
    this.cognome = this.shoesService.cognome
    this.indirizzo = this.shoesService.indirizzo
    this.citta = this.shoesService.citta
    this.paese = this.shoesService.paese
    this.telefono = this.shoesService.telefono
    this.cap = this.shoesService.cap
    this.email = this.shoesService.email
    this.shoesOrdered = this.shoesService.shoesSelectedArray
    this.isLoggedIn = this.authService.isLoggedIn
    if (!this.isLoggedIn) {
      this.orderNumber = this.generaNumOrd()
    } else {
      this.orderNumber = this.localeStorage.orderNumber
    }
  }
  // Funzione utilizata per generare un numero d'ordine random
  generaNumOrd(): number {
    return Math.floor(Math.random() * (999999 - 100000 + 1) + 100000)
  }
  // Funzione utilizzata per svuotare il carrello una volta fatto l'ordine
  resetCart(){
    this.shoesService.shoesSelectedArray = []
  }
}
