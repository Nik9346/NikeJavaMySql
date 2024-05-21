import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IShoes } from '../../models/shoes-interface.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shoes-card',
  templateUrl: './shoes-card.component.html',
  styleUrl: './shoes-card.component.sass'
})
export class ShoesCardComponent {
  
@Output() shoesIdEmitter: EventEmitter<number> = new EventEmitter()  

@Input() shoes: IShoes;

constructor(private router:Router){}

goToShoes() {
  this.router.navigate(['/shoes-page/', this.shoes.id])
}

}
