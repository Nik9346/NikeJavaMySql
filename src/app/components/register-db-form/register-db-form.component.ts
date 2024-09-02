import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserData } from '../../models/register-interface.models';
import { IProfiloUtenteDb, IUtenteDb } from '../../models/login-interface.models';

@Component({
  selector: 'app-register-db-form',
  templateUrl: './register-db-form.component.html',
  styleUrl: './register-db-form.component.sass'
})
export class RegisterDbFormComponent {

  email: string
  password: string
  registerForm: FormGroup
  formData: IUtenteDb
  @Output() formDataDbEmit: EventEmitter<IUtenteDb> = new EventEmitter<IUtenteDb>()
  @Output() toLogin: EventEmitter<IProfiloUtenteDb> = new EventEmitter()

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      nome: new FormControl("", Validators.required),
      cognome: new FormControl("", Validators.required),
      // indirizzo: new FormControl("", Validators.required),
      // citta: new FormControl("", [Validators.required,Validators.pattern("^(?!\\s+$)[a-zA-ZÀ-ÖØ-öø-ÿ\\s'-]+$")]),
      // paese: new FormControl("", Validators.required),
      // cap: new FormControl("", [Validators.required,Validators.pattern("^\\d{5}$")]),
      // telefono: new FormControl("", Validators.required),
      // email: new FormControl ("",[Validators.required,Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
      profilo: new FormGroup({
        username: new FormControl("", [Validators.required]),
        password: new FormControl("", [Validators.required, Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,50}')])
      })
    })
  }

  onSubmit() {
    this.formData = this.registerForm.value
   this.formDataDbEmit.emit(this.formData);
  }
  goToLogin() {
    const datiutente = this.registerForm.value
    const profiloLogin :IProfiloUtenteDb = {
      username: datiutente.profilo.username,
      password: datiutente.profilo.password,
      id: null,
      token: undefined
    }
    console.log(profiloLogin);
    
    console.log(datiutente);
    
    this.toLogin.emit(profiloLogin)
  }
}

