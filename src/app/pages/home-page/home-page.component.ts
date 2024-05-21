import { AfterViewInit, Component, ElementRef, ViewChild, } from '@angular/core';
import { ShoesService } from '../../services/shoes.service';
import { IShoes, IShoesSelected } from '../../models/shoes-interface.models';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.sass'
})
export class HomePageComponent implements AfterViewInit {

  shoes: IShoes[] = []
  user: string
  isLoggedIn: boolean
  @ViewChild('divcarousel') divcarousel: ElementRef<HTMLDivElement>
  @ViewChild('divcarousel2') divcarousel2: ElementRef<HTMLDivElement>
  cartVisible: boolean = false
  shoesSelectedArray: IShoesSelected[] = []



  constructor(private shoesService: ShoesService, private authService: AuthService) { }

  // Funzione che fa una chiamata al service e popola le due variabili relative alle scarpe e al carrello
  ngAfterViewInit() {
    this.shoesService.getShoes().subscribe((response) => {
      this.shoes = response
    })
    this.shoesSelectedArray = this.shoesService.shoesSelectedArray
    this.isLoggedIn = this.authService.isLoggedIn
    if (this.isLoggedIn) {
      this.user = this.shoesService.user
    }
  }

  // Funzioni utilizzate per lo scorrimento dei div a destra e sinistra

  slideLeft() {
    this.divcarousel.nativeElement.scrollLeft -= 300

  }
  slideright() {
    this.divcarousel.nativeElement.scrollLeft += 300
  }

  slideLeft2() {
    this.divcarousel2.nativeElement.scrollLeft -= 300

  }
  slideright2() {
    this.divcarousel2.nativeElement.scrollLeft += 300
  }
  // Funzioni utilizzate per la visualizzazione del carrello
  viewCart() {
    if (this.shoesSelectedArray.length) {
      this.cartVisible = true
      this.hideCart()
    }
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
  logout() {
    this.isLoggedIn = false
    this.authService.isLoggedIn = !this.authService.isLoggedIn
    this.shoesService.shoesSelectedArray.splice(0,this.shoesSelectedArray.length)
  }


}

// questa funzione mi ha permesso di popolare le immagini
// this.shoesName.forEach((shoes) => {
      //   this.shoesService.searchImages(shoes).subscribe((response) => {

      //     console.log(response);
      //     this.shoes.forEach(element => {
      //       if (response.items[0].title.toLowerCase().includes(element.nome.toLowerCase())) {
      //         const image = response.items[0].link
      //         // element.immagine = image
      //         this.shoesService.addImgShoes(element.id, image).subscribe(() => {
      //           element.immagine = image
      //         })
      //       }
      //     })
      //   })
      // })  

