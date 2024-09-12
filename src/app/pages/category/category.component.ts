import { Component, OnDestroy } from '@angular/core';
import { ShoesService } from '../../services/shoes.service';
import { IShoes, IShoesCartDb, IShoesSelected } from '../../models/shoes-interface.models';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.sass'
})
export class CategoryComponent {
  
  shoesCategory: IShoes[] = []
  catOfShoes: string = ''
  isLoggedIn: boolean
  user: string
  cartVisible: boolean = false
  shoesSelectedArray:IShoesCartDb[] = []

  constructor(private shoesService: ShoesService, private activeRouter: ActivatedRoute, private authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn
    if(this.isLoggedIn){
      this.user = this.shoesService.user
    }
    this.shoesSelectedArray = this.shoesService.shoesSelectedArray
    // Vecchio metodo
    // this.shoesService.getShoes().subscribe((response) => {
    //   this.shoes = response
    //   this.activeRouter.params.subscribe((params) => {
    //     this.catOfShoes = params.productCategory
    //     this.shoesCategory = []
    //     this.shoes.forEach(element => {
    //       if (element.categoria == this.catOfShoes) {
    //         this.shoesCategory.push(element)
    //       }
    //     });
    //   })
    // });

    // Codice Ottimizzato
    this.activeRouter.params.subscribe((params)=>{
      this.catOfShoes = params.productCategory
      this.shoesService.getShoesByCat(this.catOfShoes).subscribe((response)=>{
        this.shoesCategory = response
      })
    })
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
  // Funzione utilizzata per il logout
  logout(){
    this.isLoggedIn = false
    this.authService.isLoggedIn = !this.authService.isLoggedIn
  }

}
