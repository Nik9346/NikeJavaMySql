import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserData } from '../../models/register-interface.models';
import { IProfiloUtenteDb } from '../../models/login-interface.models';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.sass'
})
export class AuthFormComponent implements OnInit {

  email: string
  password: string
  authForm: FormGroup
  loginData: UserData
  @Input() passwordError: boolean
  @Input() userNameNotFound : boolean
  @Output() registrationEmitter: EventEmitter<void> = new EventEmitter();
  @Output() loginEmitter: EventEmitter<Object> = new EventEmitter<Object>();
  @Output() registrationEmitterDb: EventEmitter<Object> = new EventEmitter<Object>();


  ngOnInit(): void {
    this.authForm = new FormGroup({
      username: new FormControl("", Validators.required),
      password: new FormControl("", [Validators.required, Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,50}')])
    })
  }

  onSubmit() {
    this.loginData = this.authForm.value
    this.goToLogin()
  }

  goToRegistration() {
    this.registrationEmitter.emit()
  }
  goToRegistrationDb() {
    this.registrationEmitterDb.emit();
  }

  //Funzione utilizzata prima del cambio backend
  // goToLogin() {
  //   // this.loginEmitter.emit(this.loginData)
  // }

  goToLogin() {
    const datiutente = this.authForm.value
    const profiloLogin: IProfiloUtenteDb = {
      username: datiutente.username,
      password: datiutente.password,
      id: null,
      token: undefined
    }
    this.loginEmitter.emit(profiloLogin)
  }
}
