import { Component } from '@angular/core';
import { ShoesService } from '../../services/shoes.service';
import { UserData } from '../../models/register-interface.models';
import { ILoginDataDbResponse, IUtenteDb, loginData } from '../../models/login-interface.models';
import { LocalWebsaveService } from '../../services/local-websave.service'
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.sass'
})
export class AuthComponent {
  registerDb : boolean = false
  isRegister: boolean = true
  isLoggedIn: boolean
  user: string
  passwordError: boolean = false


  constructor(private shoesService: ShoesService, private localStorageService: LocalWebsaveService, private router: Router, private authService: AuthService) {
    this.isLoggedIn = this.authService.isLoggedIn
    this.isLoggedIn = this.authService.isLoggedIn
    this.user = this.shoesService.user
  }

  //  Funzione utilizzata per visualizzare il form di registrazione al click sul pulsante registrati
  viewRegistration() {
    this.isRegister = false
  }
  //funzione utilizzata per registrare l'utente nel db
  viewRegistrationDb(){
    this.registerDb = true;
  }
  viewLogin(){
    this.isRegister = true
  }
  // Funzione utilizzata per passare i dati della registrazione al database
  updateDataUser(event: UserData) {
    this.authService.register(event).subscribe((response)=>{
      console.log(response);
    })
    this.router.navigate(['/home-page'])    
  }
  updateDataUserDb(event:IUtenteDb){
    this.authService.registerDb(event).subscribe((response:ILoginDataDbResponse)=>{
      const responseServerLogin:ILoginDataDbResponse = response;
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

  goToLoginDb(event:IUtenteDb){
    this.authService.loginDb(event).subscribe((response: ILoginDataDbResponse)=>{
      console.log(response);
      this.saveTokentoStorage(response.messaggio)
      this.authService.isLoggedIn = true
      this.router.navigate(['/home-page']);
    },(error)=>{
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
