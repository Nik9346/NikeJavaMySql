import { Component, Input } from '@angular/core';
import { IShoesSelected } from '../../models/shoes-interface.models';

@Component({
  selector: 'app-card-order-product',
  templateUrl: './card-order-product.component.html',
  styleUrl: './card-order-product.component.sass'
})
export class CardOrderProductComponent {

  @Input() shoes:IShoesSelected

}
