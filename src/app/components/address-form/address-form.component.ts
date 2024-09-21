import { Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrl: './address-form.component.sass'
})
export class AddressFormComponent {
  @Input() addressForm:FormArray

  constructor(){
    this.addressForm = new FormArray([
      new FormGroup({
        indirizzo: new FormControl(''),
        civico: new FormControl(''),
        città: new FormControl(''),
        paese: new FormControl(''),
        cap: new FormControl(''),
        provincia: new FormControl('')
    })
  ])
  }
}
