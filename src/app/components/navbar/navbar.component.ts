import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { IShoesSelected } from '../../models/shoes-interface.models';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.sass'
})
export class NavbarComponent{
  
  isVisible: boolean = false
  timer: any
  searchText: string = ''
  
  @Input() shoesSelectedArray: IShoesSelected []
  @Input() cartVisible : boolean
  @Input() isLoggedIn : boolean
  @Input() username : string
  
  @Output() searchEmitter: EventEmitter<string> = new EventEmitter<string>
  @Output() displaycartEmitter: EventEmitter<void> = new EventEmitter<void>
  @Output() closeCartEmitter: EventEmitter<void> = new EventEmitter
  @Output() logoutEmitter: EventEmitter<void> = new EventEmitter
  
  constructor(private router: Router) { }


  // Funzioni utilizzate per visualizzare il menu di secondo livello
  showComponent() {
    this.isVisible = true
  }
  hideComponent() {
    this.isVisible = false
  }
  startHideTimer() {
    this.timer = setTimeout(() => {
      this.isVisible = false
    }, 500)
  }
  clearTimer() {
    clearTimeout(this.timer)
  }
  
  // Utilizzo questa funzione per cercare la scarpa digitando nella searchbox
  searchShoes(search: string) {
    if (this.searchText) {
      this.router.navigate(['search/', search])
      this.searchText = ''
    }
  }
  // Con questa funzione svuoto la variabile degli oggetti ricercati
  clearShoesSearchVariable(){
    this.searchEmitter.emit('la variabile di ricerca è stata resettata')
  }
  //  Con questa funzione mostro e nascondo il carrello
  displayCart(): void{
   this.displaycartEmitter.emit()
  }
  closeCartEvent(){
    this.closeCartEmitter.emit()
  }

  logout(){
    this.logoutEmitter.emit()
  }
}