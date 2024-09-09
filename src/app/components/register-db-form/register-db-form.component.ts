import { Component, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { UserData } from '../../models/register-interface.models';
import { IProfiloUtenteDb, IUtenteDb } from '../../models/login-interface.models';
import { IAddressDb } from '../../models/address.interface';

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
  indirizziDb: IAddressDb[]=[]
  addressForm:FormGroup

  @Output() formDataDbEmit: EventEmitter<IUtenteDb> = new EventEmitter<IUtenteDb>()
  @Output() toLogin: EventEmitter<void> = new EventEmitter()

  constructor(private fb:FormBuilder){}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      nome: new FormControl("", [Validators.pattern(/^[A-Za-z]{2,50}$/), Validators.required]),
      cognome: new FormControl("", [Validators.pattern(/^[A-Za-z]{2,50}$/), Validators.required]),
      indirizzi: this.fb.array([])
        // telefono: new FormControl("", Validators.required),
        // email: new FormControl ("",[Validators.required,Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')]),
        ,
      profilo: new FormGroup({
        username: new FormControl("", [Validators.required]),
        password: new FormControl("", [Validators.required, Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,50}')])
      })
    })
  }
  addAddress(){
    const addressGroup :IAddressDb = this.fb.group({
      citta: ['',Validators.required],
      indirizzo:['',Validators.required],
      cap:['',Validators.required]
    })
    this.indirizzi.push(addressGroup)
  }

  onSubmit() {
    // this.indirizziDb.push(this.formData.indirizzi);
    this.formData = this.registerForm.value
    console.log(this.formData);
    // this.formDataDbEmit.emit(this.formData);
  }
  //Funzione commentata perchè permetteva direttamente accesso sostituita da pagina accesso
  // goToLogin() {
  //   const datiutente = this.registerForm.value
  //   const profiloLogin: IProfiloUtenteDb = {
  //     username: datiutente.profilo.username,
  //     password: datiutente.profilo.password,
  //     id: null,
  //     token: undefined
  //   }
  //   this.toLogin.emit(profiloLogin)
  // }

  goToLoginPage(){
    this.toLogin.emit()
  }
}

