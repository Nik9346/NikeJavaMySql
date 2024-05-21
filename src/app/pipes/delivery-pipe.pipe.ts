import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deliveryPipe'
})
export class DeliveryPipePipe implements PipeTransform {

  transform(value: any, ...args: any[]) {
      
  }
}