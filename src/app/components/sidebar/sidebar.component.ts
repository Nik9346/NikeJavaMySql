import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IShoes } from '../../models/shoes-interface.models';
import { ShoesService } from '../../services/shoes.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.sass'
})
export class SidebarComponent {
  @Input() shoesCategory: IShoes[] = []
  @Input() shoes: IShoes[] = []
  @Input() shoesColor: string[] = []
  @Input() shoesFiltered: IShoes[] = []
  @Output() emitter: EventEmitter<string> = new EventEmitter()
  @Output() colorEmitter:EventEmitter<string> = new EventEmitter()
  @Output() priceEmitter:EventEmitter<number> = new EventEmitter()
  @Output() allItemEmit:EventEmitter<void> = new EventEmitter()
  
  constructor(){  };


  filterPrice(value:number) {
    this.priceEmitter.emit(value)
  }

  getCategory(c:string){
      this.emitter.emit(c)
  }

  getColor(color:string){
    this.colorEmitter.emit(color)
  }
  resetItem(){
    this.allItemEmit.emit()
  }
}
