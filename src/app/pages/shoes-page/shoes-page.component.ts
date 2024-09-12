import { AfterViewInit, Component, ElementRef, EventEmitter, Output, output, ViewChild, viewChild } from '@angular/core';
import { IShoes, IShoesCartDb, IShoesDb, IShoesItemAddToCart, IShoesSelected } from '../../models/shoes-interface.models';
import { ShoesService } from '../../services/shoes.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SessionService } from '../../services/session.service';
import { ITagliaDb } from '../../models/taglia.interface';
import { IcolorDb } from '../../models/color.interface';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-shoes-page',
  templateUrl: './shoes-page.component.html',
  styleUrl: './shoes-page.component.sass'
})
export class ShoesPageComponent {

  singleShoes: IShoesDb
  taglieDisponibili: ITagliaDb[] = []
  coloriDisponibili: IcolorDb[] = []
  sizeSelected: ITagliaDb = null
  colorSelected: IcolorDb = null
  completeSizeColor: boolean = true
  shoesSelectedArray: IShoesCartDb[] = []
  shoesSelectedArrayForCartSave: IShoesCartDb[] = []
  shoesToAddToCart: IShoesItemAddToCart
  @ViewChild('container') container: ElementRef
  cartVisible: boolean = false
  isLoggedIn: boolean
  user: string


  constructor(
    private shoesService: ShoesService,
    private activatedrouter: ActivatedRoute,
    private authService: AuthService,
    private sessionService: SessionService,
    private cartService: CartService) {
    this.isLoggedIn = this.authService.isLoggedIn
    if (this.isLoggedIn) {
      this.user = this.shoesService.user
    }
    this.activatedrouter.params.subscribe((params) => {
      this.shoesService.getShoesById(params.productId).subscribe((response) => {
        this.singleShoes = response
        this.singleShoes.taglie.forEach((taglia) => {
          this.shoesService.getTagliaByNumber(+taglia).subscribe((res) => {
            this.taglieDisponibili.push(res);
          })
        })
        this.singleShoes.colori.forEach((colore) => {
          this.shoesService.getColorByColorName(colore).subscribe((res) => {
            this.coloriDisponibili.push(res);
          })
        })
      })
    })
    this.shoesSelectedArray = this.shoesService.shoesSelectedArray
  }


  // con questa funzione aggiungo delle proprietà al prodotto che mi occorrono per il carrello
  getShoesAttribute(): void {
    const shoesCopy: IShoesItemAddToCart = {
      scarpa: {id:this.singleShoes.id},
      colore: {id:this.colorSelected.id},
      taglia: {id:this.sizeSelected.id},
      quantita: 1
    }
    const shoesSelectedForArray : IShoesCartDb = {
      scarpa: this.singleShoes,
      colore: this.colorSelected,
      taglia: this.sizeSelected,
      quantita: 1
    }
    this.shoesSelectedArray.push(shoesSelectedForArray);
    this.shoesToAddToCart = shoesCopy;
  }
  //  controllo che sia selezionata la taglia e la assegno ad una variabile
  getSize(t: ITagliaDb) {
    this.sizeSelected = t
    if (this.colorSelected) {
      this.completeSizeColor = true
    } else {
      !this.completeSizeColor
    }
  }
  // controllo che sia selezionato il colore e lo assegno ad una variabile
  getColor(c: IcolorDb
  ) {
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
      this.cartService.saveItemCart(this.shoesToAddToCart).subscribe()
      this.cartService.getCart().subscribe((res)=>{
        this.shoesService.shoesSelectedArray = res
      })
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

