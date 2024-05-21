import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShoesService } from '../../services/shoes.service';
import { IShoesSelected } from '../../models/shoes-interface.models';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { DatePipe, getLocaleDateFormat } from '@angular/common';
import { __values } from 'tslib';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrl: './pagamento.component.sass'
})
export class PagamentoComponent implements AfterViewInit, OnInit {

  shoesSelected:IShoesSelected[] = []
  isLoggedIn: boolean
  total: number
  subtotal: number
  deliveryCost: string
  nome: string
  cognome: string
  indirizzo: string
  citta: string
  paese:string
  telefono: string
  cap:string
  email:string
  delivery: string = 'delivery'
  cardNumber: string
  dateToValidated: Date
  cardCvv:string
  dataCorrente: number
  dataCurrentToValitated: Date
  paymentMethod: string = 'card'
  paymentForm2: FormGroup
  
  @ViewChild('paymentForm1') paymentForm1:ElementRef
  @ViewChild('formTemplate') formTemplate:ElementRef
  @ViewChild('formTemplatePayment') formTemplatePayment: ElementRef


  constructor(private shoesService: ShoesService, private authService: AuthService){
    this.dataCorrente = Date.now()
  }
  ngOnInit(): void {

// Reactive Forms
      this.paymentForm2 = new FormGroup (
        {
        cardNumber : new FormControl ("",[Validators.required, Validators.pattern('(\\d\\s?){16,19}$')]),
        expiringDateCard : new FormControl ('', Validators.required),
        cardCvv : new FormControl ("",[Validators.required, Validators.pattern('^[0-9]{3,4}$')])
      }
      )
  }

  ngAfterViewInit(): void {
    this.total = this.shoesService.total
    this.subtotal = this.shoesService.subtotal
    this.deliveryCost = this.shoesService.delivery
    this.shoesSelected = this.shoesService.shoesSelectedArray
    this.isLoggedIn = this.authService.isLoggedIn
    if(this.isLoggedIn){
      this.shoesSelected = []
    }
  }

  // Funzione che fa l'upload al service di tutti i dati quando faccio submit sulla prima parte del form
  onSubmit(){
    this.formTemplate.nativeElement.classList.add('hidden')
    this.formTemplatePayment.nativeElement.classList.remove('hidden')
    this.shoesService.nome = this.nome
    this.shoesService.cognome = this.cognome
    this.shoesService.citta = this.citta
    this.shoesService.cap = this.cap
    this.shoesService.indirizzo = this.indirizzo
    this.shoesService.telefono = this.telefono
    this.shoesService.email = this.email
  }

  goWithDraw(){
    return this.delivery ='withdraw'
  }

  goDelivery(){
    return this.delivery ='delivery'
  }
// Funzione utilizzata per la conversione e verifica della data di scadenza della carta
  getTime(){
    let date : Date = new Date(this.paymentForm2.value.expiringDateCard)
    this.dateToValidated = date
    let currentDate : Date = new Date(this.dataCorrente)
    this.dataCurrentToValitated = currentDate
  }
// Funzione utilizzata al submit del form pagamento
  onSubmitPay(){
    this.formTemplatePayment.nativeElement.classList.add('hidden')
  }
// Funzione utilizzata per il cambio del metodo di pagamento
  updateValueTarget(event){
    this.paymentMethod = event.target.value
  }
  
}
