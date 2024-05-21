import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserData } from '../../models/register-interface.models';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrl: './auth-form.component.sass'
})
export class AuthFormComponent implements OnInit {

  email:string
  password: string
  authForm : FormGroup
  loginData : UserData
  @Input() passwordError : boolean
  @Output() registrationEmitter: EventEmitter<void> = new EventEmitter()
  @Output() loginEmitter: EventEmitter<Object> = new EventEmitter<Object>()

  ngOnInit(): void {
      this.authForm = new FormGroup({
        email : new FormControl ("", [Validators.required,Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
        password: new FormControl("", [Validators.required,Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')])
      })
  }

  onSubmit(){
    this.loginData = this.authForm.value
    this.goToLogin()
  }

  goToRegistration(){
    this.registrationEmitter.emit()
  }

  goToLogin(){
    this.loginEmitter.emit(this.loginData)
  }
}
