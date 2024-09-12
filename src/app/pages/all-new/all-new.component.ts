import { Component } from '@angular/core';
import { ShoesService } from '../../services/shoes.service';
import { IShoes, IShoesCartDb, IShoesDb, IShoesSelected } from '../../models/shoes-interface.models';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-all-new',
  templateUrl: './all-new.component.html',
  styleUrl: './all-new.component.sass'
})
export class AllNewComponent {
  shoes: IShoes[]
  isNew : boolean = true
  isLoggedIn: boolean
  user: string
  cartVisible: boolean = false
  shoesSelectedArray:IShoesCartDb[] = []

  constructor(private shoesService: ShoesService, private authService: AuthService) {
    this.shoesSelectedArray = this.shoesService.shoesSelectedArray
    this.isLoggedIn = this.authService.isLoggedIn
    if(this.isLoggedIn){
    this.user = this.shoesService.user
    }
    this.shoesService.getNewShoes(this.isNew).subscribe((response) => {
      this.shoes = response
    });
  }

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

  booleanToNum(value:boolean){
    return value? 1:0;
  }
  logout(){
    this.isLoggedIn = false
    this.authService.isLoggedIn = !this.authService.isLoggedIn
  }

}
