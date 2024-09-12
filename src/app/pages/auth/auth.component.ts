import { Component } from '@angular/core';
import { ShoesService } from '../../services/shoes.service';
import { UserData } from '../../models/register-interface.models';
import { ILoginDataDbResponse, IProfiloUtenteDb, IUtenteDb, loginData } from '../../models/login-interface.models';
import { LocalWebsaveService } from '../../services/local-websave.service'
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DataPostService } from '../../services/data-post.service';
import { switchMap } from 'rxjs';
import { SessionService } from '../../services/session.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.sass'
})
export class AuthComponent {
  registerDb: boolean = true
  isRegister: boolean = true
  isLoggedIn: boolean
  user: string
  passwordError: boolean = false


  constructor(private shoesService: ShoesService, 
    private localStorageService: LocalWebsaveService, 
    private dataService: DataPostService, 
    private router: Router, 
    private authService: AuthService, 
    private sessionService: SessionService,
  private cartService:CartService) {
    this.isLoggedIn = this.authService.isLoggedIn
    this.isLoggedIn = this.authService.isLoggedIn
    this.user = this.shoesService.user
  }

  //  Funzione utilizzata per visualizzare il form di registrazione al click sul pulsante registrati
  viewRegistration() {
    this.isRegister = false
    this.registerDb = true
  }
  //funzione utilizzata per registrare l'utente nel db
  viewRegistrationDb() {
    this.registerDb = false;
    this.isRegister = true;
  }
  viewLogin() {
    this.registerDb = true
    console.log(this.isRegister);
    
  }
  // Funzione utilizzata per passare i dati della registrazione al database
  updateDataUser(event: UserData) {
    this.authService.register(event).subscribe((response) => {
      console.log(response);
    })
    this.router.navigate(['/home-page'])
  }
  updateDataUserDb(event: IUtenteDb) {
    this.authService.registerDb(event).subscribe((response: ILoginDataDbResponse) => {
      const responseServerLogin: ILoginDataDbResponse = response;
      this.saveTokentoStorage(responseServerLogin.messaggio);
    })
  }
  // Funzione utilizzata al click sul pulsante login prende i dati dal database, fa una chiamata post al locale storage per salvare il token, cambia il valore della variabile IsloggedIn in true e posta tutti i dati allo shoesService. Poi reindirizza alla home-page
  goToLogin(event: Object) {
    this.authService.login(event).subscribe((response: loginData) => {
      this.saveTokentoStorage(response.accessToken)
      this.authService.isLoggedIn = true
      this.shoesService.user = response.user.user
      this.shoesService.nome = response.user.nome
      this.shoesService.cognome = response.user.cognome
      this.shoesService.indirizzo = response.user.indirizzo
      this.shoesService.citta = response.user.citta
      this.shoesService.cap = response.user.cap
      this.shoesService.paese = response.user.paese
      this.shoesService.telefono = response.user.telefono
      this.shoesService.email = response.user.email
      this.shoesService.id = response.user.id
      this.shoesService.shoesSelectedArray = []
      this.router.navigate(['/home-page'])
      // se la risposta dà come errore password non corretta, la variabile passwordError viene cambiata in true e viene poi visualizzato il messaggio di errore sotto il campo input password
    }, (error) => {
      if (error.error == "Incorrect password") {
        this.passwordError = true
      };
    })
  }

  //funzione utilizzata per il login nel database e recupero dei dati dopo login
  goToLoginDb(event: IProfiloUtenteDb) {
    this.authService.loginDb(event).pipe(switchMap((response: ILoginDataDbResponse) => {
      this.saveTokentoStorage(response.messaggio)
      this.authService.isLoggedIn = true
      return this.dataService.getProfiloByUsername(event.username)
    })
    ).subscribe((profiloResponse:IUtenteDb) => {
      if(this.sessionService.getItem("carrello:")){
        const savedItemCart = this.sessionService.getItem("carrello:")
        savedItemCart.forEach((i)=>{
          this.cartService.saveItemCart(i).subscribe()
        })
        this.sessionService.removeSession("carrello:")
      }
      this.shoesService.nome = profiloResponse.nome
      this.shoesService.cognome = profiloResponse.cognome
      this.shoesService.user = profiloResponse.profilo.username
      setTimeout(()=>{
        this.cartService.getCart().subscribe((res)=>{
          this.shoesService.shoesSelectedArray.push(res)
        })
        this.router.navigate(['/home-page']);
      },500)
    },
      (error) => {
        console.log(error);
      })
  }

  // Funzione utilizzata per salvare il token nel locale storage
  saveTokentoStorage(token: string): void {
    this.localStorageService.setToken(token)
  }
  // Funzione utilizzata per fare il logout
  logout() {
    this.isLoggedIn = false
    this.authService.isLoggedIn = !this.authService.isLoggedIn
  }
}
