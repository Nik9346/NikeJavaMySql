import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ShoesService } from '../../services/shoes.service';
import { IShoes } from '../../models/shoes-interface.models';

@Component({
  selector: 'app-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrl: './navbar-menu.component.sass'
})
export class NavbarMenuComponent {
  
  shoesCategory: string[] = []


  constructor(private shoesService: ShoesService) {

    this.shoesService.getShoes().subscribe((response) => {
      response.forEach(element => {
        if (!this.shoesCategory.includes(element.categoria)) {
          this.shoesCategory.push(element.categoria)
        }
      })
    });
  }
}
