import { Component, EventEmitter, Input, Output, SimpleChange } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormControl, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
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
  indirizziDb: IAddressDb[] = []
  addressForm: FormGroup
  @Input() registerComplete: boolean;

  @Input() userNameConfict : boolean;

  @Output() formDataDbEmit: EventEmitter<IUtenteDb> = new EventEmitter<IUtenteDb>()
  @Output() toLogin: EventEmitter<void> = new EventEmitter()

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      nome: new FormControl("", [Validators.pattern(/^[A-Za-z]{2,50}$/), Validators.required]),
      cognome: new FormControl("", [Validators.pattern(/^[A-Za-z]{2,50}$/), Validators.required]),
      indirizzi: new FormArray([
      ]),
      profilo: new FormGroup({
        username: new FormControl("", [Validators.required]),
        password: new FormControl("", Validators.compose([Validators.required, Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,50}')]))
      })
    })
    this.addAddress() 
  }

  public get addressesAsFormArray(): FormArray {
    return this.registerForm.get('indirizzi') as FormArray
  }

  public get profiloAsFormGroup(): FormGroup{
    return this.registerForm.get('profilo') as FormGroup
  }

  addAddress() {
    this.addressesAsFormArray.push(this.getAddressFormGroup())
  }
  removeAddress(formId: number) {
    this.addressesAsFormArray.removeAt(formId);
  }
  getAddressFormGroup(): FormGroup {
    return new FormGroup({
      id: new FormControl(this.addressesAsFormArray.controls.length + 1),
      indirizzo: new FormControl('', Validators.compose([Validators.required])),
      civico: new FormControl('', Validators.compose([Validators.required])),
      citta: new FormControl('', Validators.compose([Validators.required, Validators.pattern("^(?!\\s+$)[a-zA-ZÀ-ÖØ-öø-ÿ\\s'-]+$")])),
      paese: new FormControl(''),
      cap: new FormControl('', Validators.compose([Validators.required,Validators.pattern("^\\d{5}$")])),
      provincia: new FormControl('', Validators.compose([Validators.required,Validators.maxLength(2)]))
    })
  }
  getLabelIndirizzo(index: number) {
    return index === 0 ? 'Principale' : 'di Domicilio'
  }

  formValidation(formGroup: any, formControlName: string) {
      const control = formGroup.get(formControlName)
      return control?.touched && control.invalid ? true : false;
  }
  getFieldErrorByType(formgroup: any, formControlName: string, type: string) {
    const control = formgroup.get(formControlName);
    return control?.errors?.[type] || false

  }

  onSubmit() {
  const formValue = this.registerForm.value
  const addressWithoutId = formValue.indirizzi.map((address:any)=>{
    const {id,...rest} = address
    return rest;
  })
  const formToSave = {
    ...formValue,
    indirizzi:addressWithoutId
  }
  this.formDataDbEmit.emit(formToSave)
  this.registerForm.reset()
  }
  
  
  // this.formDataDbEmit.emit(this.formData)
  // }
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

  goToLoginPage() {
    this.toLogin.emit()
  }
}

