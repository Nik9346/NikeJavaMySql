import { Component, Input } from '@angular/core';
import { IShoesDb, IShoesSelected } from '../../models/shoes-interface.models';
import { IShoesCartDb } from '../../models/cart.inteface';

@Component({
  selector: 'app-card-order-product',
  templateUrl: './card-order-product.component.html',
  styleUrl: './card-order-product.component.sass'
})
export class CardOrderProductComponent {

  @Input() shoes:IShoesCartDb

}
