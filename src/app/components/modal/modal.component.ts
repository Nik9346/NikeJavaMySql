import { Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.sass'
})
export class ModalComponent implements OnChanges {

  @ViewChild('modal') modal: ElementRef;
  @Input() triggerMod : boolean = false;
  @Output() goToRoute : EventEmitter<void> = new EventEmitter()
  @Input() isLoggedIn : boolean;
  @Input() orderNumber: number;

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if(this.triggerMod)
      this.triggerModal()
  }

  triggerModal(){
    const modalElement = this.modal.nativeElement;
    const modalInstance = new Modal(modalElement)
    modalInstance.show()
  }

  goRoute(){
    this.goToRoute.emit();
  }
}
