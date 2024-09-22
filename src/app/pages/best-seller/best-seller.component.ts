import { Component } from '@angular/core';
import { IShoes, IShoesDb, IShoesSelected } from '../../models/shoes-interface.models';
import { ShoesService } from '../../services/shoes.service';
import { AuthService } from '../../services/auth.service';
import { IShoesCartDb } from '../../models/cart.inteface';

@Component({
  selector: 'app-best-seller',
  templateUrl: './best-seller.component.html',
  styleUrl: './best-seller.component.sass'
})
export class BestSellerComponent {
  best_seller: IShoes[] = []
  isLoggedIn : boolean
  user: string
  cartVisible: boolean = false
  shoesSelectedArray:IShoesCartDb[] = []
  
  constructor(private shoesService: ShoesService, private authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn
    if(this.isLoggedIn){
    this.user = this.shoesService.utente.profilo.username}
    this.shoesSelectedArray = this.shoesService.shoesSelectedArray

    // Chiamata verso il database e relativo filtro degli elementi
    this.shoesService.getShoes().subscribe((response) => {
       response.forEach((element) => {
         if (element.bestSeller >= 4) {
           this.best_seller.push(element)
         }
       })
    });
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

