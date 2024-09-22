import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IShoes, IShoesDb } from '../../models/shoes-interface.models';
import { ShoesService } from '../../services/shoes.service';
import { IColor } from '../../models/color.interface';
import { ICategory } from '../../models/category.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.sass'
})
export class SidebarComponent {
  @Input() shoesCategory: ICategory[] = []
  @Input() shoes: IShoesDb[] = []
  @Input() shoesColor: string[] = []
  @Input() shoesFiltered: IShoes[] = []
  @Input() colorMap: IColor[]
  @Output() emitter: EventEmitter<string> = new EventEmitter()
  @Output() colorEmitter:EventEmitter<string> = new EventEmitter()
  @Output() priceEmitter:EventEmitter<number> = new EventEmitter()
  @Output() allItemEmit:EventEmitter<void> = new EventEmitter()
  
  constructor(){
    console.log(this.colorMap);
    };


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
