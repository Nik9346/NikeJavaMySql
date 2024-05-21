import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { IShoes } from '../models/shoes-interface.models';
import { ShoesService } from './shoes.service';


@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  totalItems: number = 50;
  shoes:IShoes[] = []
  
  getItems(page,itemsPerPage):Observable<any>{
    const startIndex = (page-1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const shoes = []
    
    this.shoesService.getShoes().subscribe((response)=>{
        for (let i = startIndex; i < endIndex; i++) {
          const element = response[i];
          shoes.push(element)
        }
    })
    return of(shoes).pipe(delay(500));
  }
  
  
  constructor(private shoesService:ShoesService) { }
}

