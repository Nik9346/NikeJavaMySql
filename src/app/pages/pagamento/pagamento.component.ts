import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShoesService } from '../../services/shoes.service';
import { IShoesSelected } from '../../models/shoes-interface.models';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { DatePipe, getLocaleDateFormat } from '@angular/common';
import { __values } from 'tslib';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { IPayment } from '../../models/payment.interface';
import { PaymentService } from '../../services/payment.service';
import { Router } from '@angular/router';
import { IShoesCartDb } from '../../models/cart.inteface';
import { IUtenteDb } from '../../models/login-interface.models';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrl: './pagamento.component.sass'
})
export class PagamentoComponent implements AfterViewInit, OnInit {

  shoesSelected: IShoesCartDb[] = []
  isLoggedIn: boolean
  total: number
  subtotal: number
  deliveryCost: string
  nome: string
  cognome: string
  indirizzo: string
  civico: string
  citta: string
  paese: string
  telefono: string
  cap: string
  email: string
  delivery: string = 'delivery'
  cardNumber: string
  dateToValidated: Date
  cardCvv: string
  dataCorrente: number
  dataCurrentToValitated: Date
  paymentMethod: string = 'card'
  paymentForm2: FormGroup
  utente: IUtenteDb;

  @ViewChild('paymentForm1') paymentForm1: ElementRef
  @ViewChild('formTemplate') formTemplate: ElementRef
  @ViewChild('formTemplatePayment') formTemplatePayment: ElementRef


  constructor(private shoesService: ShoesService, private authService: AuthService, private cartService: CartService, private paymentService: PaymentService, private router: Router) {
    this.dataCorrente = Date.now()
  }
  ngOnInit(): void {
    // Reactive Forms
    this.paymentForm2 = new FormGroup(
      {
        cardNumber: new FormControl("2133132132123131312", [Validators.required, Validators.pattern('(\\d\\s?){16,19}$')]),
        expiringDateCard: new FormControl('', Validators.required),
        cardCvv: new FormControl("123", [Validators.required, Validators.pattern('^[0-9]{3,4}$')])
      }
    )
    this.isLoggedIn = this.authService.isLoggedIn
    if (this.isLoggedIn) {
      this.cartService.getCartItem().subscribe((res) => {
        this.shoesService.shoesSelectedArray = res
        this.shoesSelected = this.shoesService.shoesSelectedArray
        this.utente = this.shoesService.utente
      })
    }
    this.total = this.shoesService.total
    this.subtotal = this.shoesService.subtotal
    this.deliveryCost = this.shoesService.delivery
  }

  ngAfterViewInit(): void {
  }

  // Funzione che fa l'upload al service di tutti i dati quando faccio submit sulla prima parte del form
  onSubmit() {
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

  goWithDraw() {
    return this.delivery = 'withdraw'
  }

  goDelivery() {
    return this.delivery = 'delivery'
  }
  // Funzione utilizzata per la conversione e verifica della data di scadenza della carta
  getTime() {
    let date: Date = new Date(this.paymentForm2.value.expiringDateCard)
    this.dateToValidated = date
    let currentDate: Date = new Date(this.dataCorrente)
    this.dataCurrentToValitated = currentDate
  }
  // Funzione utilizzata al submit del form pagamento
  onSubmitPay() {
    let payment = this.paymentForm2.value
    const dataDiScadenzaCard = new Date(payment.expiringDateCard)
    let paymentToDb: IPayment = {
      metodoPagamento: "carta credito",
      importo: this.total,
      numeroCarta: payment.cardNumber,
      cvv: payment.cardCvv,
      dataScadenza: dataDiScadenzaCard
    }
    console.log(paymentToDb);
    this.paymentService.payment = paymentToDb
    this.router.navigate(['order'])
    // this.formTemplatePayment.nativeElement.classList.add('hidden')
  }
  // Funzione utilizzata per il cambio del metodo di pagamento
  updateValueTarget(event) {
    this.paymentMethod = event.target.value
  }

}
