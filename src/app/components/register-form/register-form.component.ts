import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserData } from '../../models/register-interface.models';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.sass'
})
export class RegisterFormComponent implements OnInit {
  
  email:string
  password: string
  registerForm : FormGroup
  formData : any
  @Output() formDataEmit: EventEmitter<UserData> = new EventEmitter<UserData>()
  @Output() toLogin: EventEmitter<void> = new EventEmitter()
  
  ngOnInit(): void {
      this.registerForm = new FormGroup({
        nome: new FormControl("", Validators.required),
        cognome: new FormControl("", Validators.required),
        indirizzo: new FormControl("", Validators.required),
        citta: new FormControl("", [Validators.required,Validators.pattern("^(?!\\s+$)[a-zA-ZÀ-ÖØ-öø-ÿ\\s'-]+$")]),
        paese: new FormControl("", Validators.required),
        cap: new FormControl("", [Validators.required,Validators.pattern("^\\d{5}$")]),
        telefono: new FormControl("", Validators.required),
        email: new FormControl ("",[Validators.required,Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
        user : new FormControl ("", [Validators.required]),
        password: new FormControl("", [Validators.required,Validators.pattern('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$')])
      })
  }

  onSubmit(){
    this.formData = this.registerForm
    this.formDataEmit.emit(this.formData.value)
  }
  goToLogin(){
    this.toLogin.emit()
  }
}
