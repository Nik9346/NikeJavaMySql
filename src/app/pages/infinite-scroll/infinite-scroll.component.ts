import { Component, HostListener, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PaginationService } from '../../services/pagination.service';
import { IShoes, IShoesSelected } from '../../models/shoes-interface.models';
import { AuthService } from '../../services/auth.service';
import { ShoesService } from '../../services/shoes.service';
import { IShoesCartDb } from '../../models/cart.inteface';


@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrl: './infinite-scroll.component.sass'
})


export class InfiniteScrollComponent implements OnInit {
  shoes: IShoes[] = [];
  isLoading: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 10;
  isLoggedIn: boolean;
  user: string;
  cartVisible: boolean = false
  shoesSelectedArray: IShoesCartDb[] = []

  constructor(private infiniteScrollService: PaginationService, private authService: AuthService, private shoesService: ShoesService) { }


  ngOnInit() {
    this.loadData();
    this.isLoggedIn = this.authService.isLoggedIn
    if (this.isLoggedIn) {
      this.user = this.shoesService.user
    }
    this.shoesSelectedArray = this.shoesService.shoesSelectedArray
  }

  // Funzione che cambia lo stato della variabile boolean per visualizzare l'icona di caricamento
  toggleLoading = () => this.isLoading = !this.isLoading

  // Funzione che fa una chiamata al service per popolare la pagina passandogli le variabili al valore originale e assegna la risposta all'array shoes, al completamento cambia lo stato della variabile di caricamento
  loadData = () => {
    this.toggleLoading()
    this.infiniteScrollService.getItems(this.currentPage, this.itemsPerPage).subscribe({
      next: response => this.shoes = response,
      error: err => console.log(err),
      complete: () => this.toggleLoading()
    })
  }

  // Funzione che cambia lo stato della variabile caricamento, fa una chiamata al service passondogli le due variabili della pagina e degli elementi, e in risposta riceve altri elementi che aggiunge all'array, al completamento del caricamento cambia lo stato della variabile caricamento
  appendData = () => {
    this.toggleLoading();
    this.infiniteScrollService.getItems(this.currentPage, this.itemsPerPage).subscribe({
      next: response => this.shoes = [...this.shoes, ...response],
      complete: () => this.toggleLoading()
    })
  }

  // Quando scrolliamo la pagina si incrementa il valore della variabile currentpage e quindi si richiama appendData
  onScroll = () => {
    if (this.shoes.length < this.infiniteScrollService.totalItems) {
      this.currentPage++;
      this.appendData();
    }
  }

  // Funzioni utilizzate per visualizzare il carrello
  viewCart() {
    this.cartVisible = true
    this.hideCart()
  }

  hideCart() {
    setTimeout(() => {
      this.cartVisible = false
    }, 3500)
  }
  hideCartNow() {
    this.cartVisible = false
  }

  //  Funzione utilizzata per il logout
  logout() {
    this.isLoggedIn = false
    this.authService.isLoggedIn = !this.authService.isLoggedIn
  }


}
