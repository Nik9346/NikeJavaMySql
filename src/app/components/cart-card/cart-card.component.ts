import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IShoesSelected } from '../../models/shoes-interface.models';

@Component({
  selector: 'app-cart-card',
  templateUrl: './cart-card.component.html',
  styleUrl: './cart-card.component.sass'
})
export class CartCardComponent {

  @Input() shoesSelectedArray:IShoesSelected[]
  @Input() cartVisible: boolean
  @Input() isLoggedIn: boolean
  @Output() closeCartEmitter: EventEmitter<void> = new EventEmitter<void>
  
  constructor(){
  }

  // Utilizzo questa funzione per chiudere il carrello
  closeCart(){
    this.closeCartEmitter.emit()
  }
}
