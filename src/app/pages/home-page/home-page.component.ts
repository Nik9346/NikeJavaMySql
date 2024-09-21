import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, } from '@angular/core';
import { ShoesService } from '../../services/shoes.service';
import { IShoes, IShoesDb, IShoesSelected } from '../../models/shoes-interface.models';
import { AuthService } from '../../services/auth.service';
import { filter } from 'rxjs';
import { SessionService } from '../../services/session.service';
import { CartService } from '../../services/cart.service';
import { IShoesCartDb } from '../../models/cart.inteface';
import { ResolveEnd } from '@angular/router';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.sass'
})
export class HomePageComponent implements OnInit {

  shoes: IShoesDb[] = []
  user: string
  isLoggedIn: boolean
  @ViewChild('divcarousel') divcarousel: ElementRef<HTMLDivElement>
  @ViewChild('divcarousel2') divcarousel2: ElementRef<HTMLDivElement>
  @ViewChild('container') container: ElementRef<HTMLDivElement>
  cartVisible: boolean = false
  shoesSelectedArray: IShoesCartDb[] = []



  constructor(private shoesService: ShoesService, private authService: AuthService, private session: SessionService, private cartService: CartService, private sessionService: SessionService) { }

  // Funzione che fa una chiamata al service e popola le due variabili relative alle scarpe e al carrello
  ngOnInit() {
    this.shoesService.getShoes().subscribe((response) => {
      this.shoes = response
    })

    let randomNumber: number = this.shoesService.getRandomArbitrary()
    let randomNumberString: string = randomNumber.toString(10)

    sessionStorage.setItem("utente:", randomNumberString)

    // this.shoesSelectedArray = this.shoesService.shoesSelectedArray

    this.isLoggedIn = this.authService.isLoggedIn
    if (this.isLoggedIn) {
      this.user = this.shoesService.utente.profilo.username
      this.cartService.getCartItem().subscribe((res) => {
        res.forEach((element) => {
          if (!this.shoesSelectedArray.includes(element))
            this.shoesSelectedArray.push(element)
        })
        this.shoesService.shoesSelectedArray = this.shoesSelectedArray
      })
    }
    let savedItemCart = this.sessionService.getItem("carrello:")
    if (savedItemCart) {
      savedItemCart.forEach((element) => {
        this.cartService.getCartItemNotLogged(element).subscribe((res) => {
          if (res && !this.shoesSelectedArray.includes(res)) {
            this.shoesSelectedArray.push(res)
            this.shoesService.shoesSelectedArray = this.shoesSelectedArray
          }
        })
      }
      )
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

  filterContainerBlur() {
    this.container.nativeElement.style.filter = 'blur(8px)'
  }
  filterContainerBlurOff() {
    this.container.nativeElement.style.filter = 'none'
  }
  // Funzione utilizzata per il logout
  logout() {
    this.authService.logoutDb(localStorage.getItem("token")).subscribe((response) => {
      console.log(response);
    })
    this.isLoggedIn = false
    this.authService.isLoggedIn = !this.authService.isLoggedIn
    this.shoesService.shoesSelectedArray.splice(0, this.shoesSelectedArray.length)
    localStorage.removeItem("token")
    sessionStorage.removeItem("utente:")
    sessionStorage.removeItem("carrello:")
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

