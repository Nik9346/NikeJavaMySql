import { Component, OnChanges } from '@angular/core';
import { ShoesService } from '../../services/shoes.service';
import { IShoes, IShoesSelected } from '../../models/shoes-interface.models';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrl: './all-product.component.sass'
})
export class AllProductComponent{
  shoes: IShoes[] = []
  shoesFiltered: IShoes[] = []
  shoesName: string[] = []
  shoesCategory: string[] = []
  shoesColor: string[] = []
  color: string
  category: string
  priceFilter: number
  isLoggedIn: boolean
  user:string
  cartVisible: boolean = false
  shoesSelectedArray:IShoesSelected[] = []
  shoesColorTraduct: string[] = ["Black","White", "Grey","Blue","Red","Black/Yellow","Grey/Blue","White Red","Green","Grey/Orange","White black","Blue/Green","Black red","Blue/Red","Red White","Black/Grey","Silver","Gold","Orange","Black White","Red-black"]

  constructor(private shoesService: ShoesService, private authService:AuthService) { }
  ngAfterViewInit() {
    // chiamata verso il db per il popolamento della variabile shoes e shoesFiltered + definizione delle categorie, nomi, colori
    this.isLoggedIn = this.authService.isLoggedIn
    if(this.isLoggedIn){
    this.user = this.shoesService.user
    }
    this.shoesService.getShoes().subscribe((response) => {
      this.shoes = response
      this.shoesFiltered = this.shoes
      this.shoes.forEach((element) => {
        this.shoesName.push(element.nome)
        if (!this.shoesCategory.includes(element.categoria)) {
          this.shoesCategory.push(element.categoria)
        }
      })
      this.shoes.forEach((element) => {
        element.colori_disponibili.forEach((color) => {
          if (!this.shoesColor.includes(color)) {
            this.shoesColor.push(color)
          }
        })
      })
    })
    this.shoesSelectedArray = this.shoesService.shoesSelectedArray
    console.log(this.shoesColor);
    
  }

  // Funzione tramite la quale filtro le scarpe in base alla categoria e visualizzo i relativi colori disponibili in base alla categoria
  goToCategory(category: string) {
    this.category = category
    this.color = null
    this.shoesFiltered = []
    this.shoesColor = []
    this.shoes.forEach((element) => {
      if (element.categoria == category) {
        this.shoesFiltered.push(element)
      }
      this.shoesFiltered.forEach((element) => {
        element.colori_disponibili.forEach((color) => {
          if (!this.shoesColor.includes(color)) {
            this.shoesColor.push(color)
          }
        })
      })
    })
  }
  // Funzione utilizzata per filtrare in base al colore
  goToColor(color: string) {
    this.color = color
  }
  // Funzione utilizzata per filtrare in base al prezzo
  filterPrice(number:number){
    this.priceFilter = number
  }

  resetItem(){
    this.shoesService.getShoes().subscribe((response) => {
      this.shoes = response
      this.shoesFiltered = this.shoes
      this.shoes.forEach((element) => {
        this.shoesName.push(element.nome)
        if (!this.shoesCategory.includes(element.categoria)) {
          this.shoesCategory.push(element.categoria)
        }
      })
      this.shoes.forEach((element) => {
        element.colori_disponibili.forEach((color) => {
          if (!this.shoesColor.includes(color)) {
            this.shoesColor.push(color)
          }
        })
      })
    })
    this.shoesSelectedArray = this.shoesService.shoesSelectedArray
  }
//  Funzioni relativi alla visualizzazione del carrello
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
// Funzione utilizzata per il logout
  logout(){
    this.isLoggedIn = false
    this.authService.isLoggedIn = !this.authService.isLoggedIn
  }
}
