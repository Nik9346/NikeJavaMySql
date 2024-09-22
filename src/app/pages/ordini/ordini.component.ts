import { Component, OnInit } from '@angular/core';
import { LocalWebsaveService } from '../../services/local-websave.service';

import { ShoesService } from '../../services/shoes.service';
import { AuthService } from '../../services/auth.service';
import { IOrderData, IOrderDb } from '../../models/orderData-interface.models';
import { DataPostService } from '../../services/data-post.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-ordini',
  templateUrl: './ordini.component.html',
  styleUrl: './ordini.component.sass'
})
export class OrdiniComponent implements OnInit {

  isLoggedIn: boolean
  userId: number
  orderedData: IOrderDb[]
  user: string


  constructor(private localStorage: LocalWebsaveService, private shoesService: ShoesService, private authService: AuthService, private dataService : DataPostService, private orderService: OrderService) { }
// Funzione che controlla se l'utente è loggato,  
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn
    if (this.isLoggedIn) {
      this.userId = this.shoesService.utente.profilo.id
      this.user = this.shoesService.utente.profilo.username

      this.orderService.getOrderByIdUtente(this.userId).subscribe((res)=>{
        this.orderedData = res
        console.log(this.orderedData);
        
      })
      
      // Prima utilizzavo questa funzione per salvare i dati nel local storage
      // this.orderedData = this.localStorage.getOrderedProductByUserId(this.userId)
      // Funzione aggiornata che fa una chiamata al db
      // this.dataService.getData(this.localStorage.getToken(),this.userId, this.orderedData).subscribe((response:IOrderData[])=>{
        // console.log(response);
        // this.orderedData = response
      // })
    }
  }

  logout() {
    this.isLoggedIn = false
    this.authService.isLoggedIn = !this.authService.isLoggedIn
  }
  


}


