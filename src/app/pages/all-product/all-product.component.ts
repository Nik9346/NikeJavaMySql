import { Component, OnChanges } from '@angular/core';
import { ShoesService } from '../../services/shoes.service';
import { IShoes, IShoesDb, IShoesSelected } from '../../models/shoes-interface.models';

import { AuthService } from '../../services/auth.service';
import { IColor } from '../../models/color.interface';
import { IShoesCartDb } from '../../models/cart.inteface';
import { ICategory } from '../../models/category.interface';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrl: './all-product.component.sass'
})
export class AllProductComponent{
  shoes: IShoesDb[] = []
  shoesFiltered: IShoesDb[] = []
  shoesName: string[] = []
  shoesCategory: ICategory[] = []
  shoesColor: string[] = []
  color: string
  category: ICategory
  priceFilter: number
  isLoggedIn: boolean
  user:string
  cartVisible: boolean = false
  shoesSelectedArray:IShoesCartDb[] = []
  
  colorMap : {[key: string]:string} ={
    "Black": "#000000",
    "White": "#ffffff",
    "Grey": "#808080",
    "Blue": "#0000ff",
    "Red": "#ff0000",
    "Yellow": "#ffff00",
    "Green": "#008000",
    "Orange": "#ffa500",
    "Silver": "#c0c0c0",
    "Gold": "#ffd700",
    "Bordeaux": "#850a36",
    "Lavanda": "#afa4ce",
    "Turchese": "#30D5C8",
    "Lilla": "#c8a2c8",
    "Magenta": "#ff00ff",
    "Cyan": "#00ffff",
    "Beige":"#e1c699",
    "Menta":"#3EB489"
  }
  
  colorObject: IColor[]=[ 
  { colore: "Nero", esadecimale: this.colorMap["Black"] || "" },
  { colore: "Bianco", esadecimale: this.colorMap["White"] || "" },
  { colore: "Grigio", esadecimale: this.colorMap["Grey"] || "" },
  { colore: "Blu", esadecimale: this.colorMap["Blue"] || "" },
  { colore: "Rosso", esadecimale: this.colorMap["Red"] || "" },
  { colore: "Nero/Giallo", esadecimale: `linear-gradient(${this.colorMap["Black"]}, ${this.colorMap["Yellow"]})` },
  { colore: "Grigio/Blue", esadecimale: `linear-gradient(${this.colorMap["Grey"]}, ${this.colorMap["Blue"]})` },
  { colore: "Bianco/Rosso", esadecimale: `linear-gradient(${this.colorMap["White"]}, ${this.colorMap["Red"]})` },
  { colore: "Verde", esadecimale: this.colorMap["Green"] || "" },
  { colore: "Grigio/Arancione", esadecimale: `linear-gradient(${this.colorMap["Grey"]}, ${this.colorMap["Orange"]})` },
  { colore: "Bianco/Nero", esadecimale: `linear-gradient(${this.colorMap["White"]}, ${this.colorMap["Black"]})` },
  { colore: "Blu/Verde", esadecimale: `linear-gradient(${this.colorMap["Blue"]}, ${this.colorMap["Green"]})` },
  { colore: "Nero/Rosso", esadecimale: `linear-gradient(${this.colorMap["Black"]}, ${this.colorMap["Red"]})` },
  { colore: "Blu/Rosso", esadecimale: `linear-gradient(${this.colorMap["Blue"]}, ${this.colorMap["Red"]})` },
  { colore: "Rosso/Bianco", esadecimale: `linear-gradient(${this.colorMap["Red"]}, ${this.colorMap["White"]})` },
  { colore: "Nero/Grigio", esadecimale: `linear-gradient(${this.colorMap["Black"]}, ${this.colorMap["Grey"]})` },
  { colore: "Argento", esadecimale: this.colorMap["Silver"] || "" },
  { colore: "Oro", esadecimale: this.colorMap["Gold"] || "" },
  { colore: "Arancione", esadecimale: this.colorMap["Orange"] || "" },
  { colore: "Nero/Bianco", esadecimale: `linear-gradient(${this.colorMap["Black"]}, ${this.colorMap["White"]})` },
  { colore: "Rosso/Nero", esadecimale: `linear-gradient(${this.colorMap["Red"]}, ${this.colorMap["Black"]})` },
  {colore: "Bordeaux", esadecimale: this.colorMap["Bordeaux"] || ""},
  {colore: "Lavanda", esadecimale: this.colorMap["Lavanda"] || ""},
  {colore: "Turchese", esadecimale: this.colorMap["Turchese"] || ""},
  {colore: "Lilla", esadecimale: this.colorMap["Lilla"] || ""},
  {colore: "Magenta", esadecimale: this.colorMap["Magenta"] || ""},
  {colore: "Cyan", esadecimale: this.colorMap["Cyan"] || ""},
  {colore: "Beige", esadecimale: this.colorMap["Beige"] || ""},
  {colore: "Menta", esadecimale: this.colorMap["Menta"] || ""},
]
 

  constructor(private shoesService: ShoesService, private authService:AuthService ) { }
  
  ngAfterViewInit() {
    // chiamata verso il db per il popolamento della variabile shoes e shoesFiltered + definizione delle categorie, nomi, colori
    this.isLoggedIn = this.authService.isLoggedIn
    if(this.isLoggedIn){
    this.user = this.shoesService.utente.profilo.username
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
        element.colori.forEach((color) => {
          if (!this.shoesColor.includes(color)) {
            this.shoesColor.push(color)
          }
        })
      })
    })
    this.shoesSelectedArray = this.shoesService.shoesSelectedArray
  }

  // Funzione tramite la quale filtro le scarpe in base alla categoria e visualizzo i relativi colori disponibili in base alla categoria
  goToCategory(category: ICategory) {
    this.category = category
    this.color = null
    this.shoesFiltered = []
    this.shoesColor = []
    this.shoes.forEach((element) => {
      if (element.categoria == category) {
        this.shoesFiltered.push(element)
      }
      this.shoesFiltered.forEach((element) => {
        element.colori.forEach((color) => {
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
        element.colori.forEach((color) => {
          if (!this.shoesColor.includes(color)) {
            this.shoesColor.push(color)
          }
        })
      })
    })
    this.shoesSelectedArray = this.shoesService.shoesSelectedArray
    this.color = null;
    this.priceFilter = null;
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
