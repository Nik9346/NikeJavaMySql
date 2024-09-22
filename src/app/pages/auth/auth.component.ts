import { Component, OnInit } from '@angular/core';
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
import { IRisposta } from '../../models/rispostaDb.interface';
import { IShoesDb } from '../../models/shoes-interface.models';
import { IShoesCartDb } from '../../models/cart.inteface';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.sass'
})
export class AuthComponent implements OnInit {
  registerDb: boolean = true
  isRegister: boolean = true
  isLoggedIn: boolean
  user: string
  passwordError: boolean = false
  registerComplete: boolean = false
  userNameConfict: boolean = false
  userNameNotFound: boolean = false
  isLoading: boolean = false
  shoesSelectedArray : IShoesCartDb[] = []
  cartVisible: boolean = false


  constructor(private shoesService: ShoesService, 
    private localStorageService: LocalWebsaveService, 
    private dataService: DataPostService, 
    private router: Router, 
    private authService: AuthService, 
    private sessionService: SessionService,
  private cartService:CartService) {
  }
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn
    this.user = this.shoesService.user
    this.shoesSelectedArray = this.shoesService.shoesSelectedArray
    if(this.isLoggedIn){
      this.shoesSelectedArray = this.shoesService.shoesSelectedArray
      this.user = this.shoesService.utente.profilo.username
    }
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
    this.registerComplete = false
  }
  // Funzione utilizzata per passare i dati della registrazione al database
  updateDataUser(event: UserData) {
    this.authService.register(event).subscribe((response) => {
      console.log(response);
    })
    this.router.navigate(['/home-page'])
  }

  //Funzione utilizzata per registrare l'utente, verifica che non sia già presente nel Db l'username, in caso di conflitto cambia la variabile che nel componente figlio permette di visualizzare il messaggio di errore
  updateDataUserDb(event: IUtenteDb) {
    this.isLoading = true
    this.authService.registerDb(event).subscribe((response: ILoginDataDbResponse) => {
      if(response.codice == 200){
        this.registerComplete = true
        this.isLoading = false
      const responseServerLogin: ILoginDataDbResponse = response;
      this.saveTokentoStorage(responseServerLogin.messaggio);
    }  
  },(error) =>{
      if(error.error.codice == 409){
        this.userNameConfict = true
        setTimeout(() => {
          this.userNameConfict = false
          this.isLoading = false
        }, 3000);
      }
    });
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
      this.shoesService.utente = profiloResponse;
      setTimeout(()=>{
        this.cartService.getCartItem().subscribe((res)=>{
          res.forEach((i)=>{
            if(!this.shoesService.shoesSelectedArray.includes(i))
              this.shoesService.shoesSelectedArray.push(i)
          })
        })
        this.router.navigate(['/home-page']);
      },500)
    },
      (error) => {
        let errore : IRisposta = error.error
        if(errore.codice === 404){
          this.userNameNotFound = true
        }
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

}
