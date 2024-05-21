import { AfterViewInit, Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { IShoes, IShoesSelected } from '../../models/shoes-interface.models';
import { ShoesService } from '../../services/shoes.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-shoes-page',
  templateUrl: './shoes-page.component.html',
  styleUrl: './shoes-page.component.sass'
})
export class ShoesPageComponent {

  singleShoes: IShoes
  taglieDisponibili: string[] = []
  coloriDisponibili: string[] = []
  sizeSelected: string = null
  colorSelected: string = null
  completeSizeColor: boolean = true
  shoesSelectedArray: IShoesSelected[]
  @ViewChild('container') container: ElementRef
  cartVisible: boolean = false
  isLoggedIn: boolean
  user: string

  constructor(private shoesService: ShoesService, private activatedrouter: ActivatedRoute, private authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn
    if (this.isLoggedIn) {
      this.user = this.shoesService.user
    }
    this.activatedrouter.params.subscribe((params) => {
      this.shoesService.getShoesById(params.productId).subscribe((response) => {
        this.singleShoes = response
        this.singleShoes.taglie_disponibili.forEach((taglia) => {
          this.taglieDisponibili.push(taglia)
        })
        this.singleShoes.colori_disponibili.forEach((colore) => {
          this.coloriDisponibili.push(colore)
        })
      })
    })
    this.shoesSelectedArray = this.shoesService.shoesSelectedArray
  }

  // con questa funzione aggiungo delle proprietà al prodotto che mi occorrono per il carrello
  getShoesAttribute(): void {
    const shoesCopy: IShoes = { ...this.singleShoes }
    shoesCopy.taglia_selezionata = this.sizeSelected
    shoesCopy.colore_selezionato = this.colorSelected
    this.shoesService.shoesSelectedArray.push(shoesCopy)
  }
  //  controllo che sia selezionata la taglia e la assegno ad una variabile
  getSize(t: string) {
    this.sizeSelected = t
    if (this.colorSelected) {
      this.completeSizeColor = true
    } else {
      !this.completeSizeColor
    }
  }
  // controllo che sia selezionato il colore e lo assegno ad una variabile
  getColor(c: string) {
    this.colorSelected = c
    if (this.sizeSelected) {
      this.completeSizeColor = true
    } else {
      !this.completeSizeColor
    }
  }
  // aggiungo il prodotto al carrello
  addToCart() {
    if (!this.sizeSelected || !this.colorSelected) {
      this.completeSizeColor = false
    } else {
      this.completeSizeColor = true
      this.getShoesAttribute()
      this.viewCart()
    }
  }
  viewCart() {
    this.container.nativeElement.classList.add('container-filter')
    this.cartVisible = true
    this.hideCart()
  }

  hideCart() {
    setTimeout(() => {
      this.container.nativeElement.classList.remove('container-filter')
      this.cartVisible = false
    }, 5500)
  }
  hideCartNow() {
    this.container.nativeElement.classList.remove('container-filter')
    this.cartVisible = false
  }
  logout() {
    this.isLoggedIn = false
    this.authService.isLoggedIn = !this.authService.isLoggedIn
  }
}

