import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.sass'
})
export class BannerComponent {

  constructor(private router: Router){
  }
  navigate(){
    this.router.navigate(['/all-product'])
  }
}
