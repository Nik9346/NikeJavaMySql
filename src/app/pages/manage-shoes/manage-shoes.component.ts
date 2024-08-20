import { Component } from '@angular/core';
import { ICategory } from '../../models/category.interface';
import { ShoesService } from '../../services/shoes.service';
import { IColor, IcolorDb } from '../../models/color.interface';

@Component({
  selector: 'app-manage-shoes',
  templateUrl: './manage-shoes.component.html',
  styleUrl: './manage-shoes.component.sass'
})
export class ManageShoesComponent {

  categorie:ICategory [] = [];
  colori : IcolorDb [] = [];
  newCategoryInsert : boolean = false;
  descrizioneCategoria: string = "";
  categoria : ICategory = {id:null, descrizione:""};
  newColorInsert : boolean = false;
  nuoviColori : IcolorDb[] = [];
  coloreNuovo: IcolorDb = {id: null, colore:"", esadecimale: null};

  constructor(private shoesService : ShoesService){};

  ngAfterViewInit(){
    this.shoesService.getCategory().subscribe((response)=>{
      this.categorie = response
    })
    this.shoesService.getColor().subscribe((response)=>{
      this.colori = response
    })
  }

  onSelectCategoryChange(event:any):void{
    this.newCategoryInsert = event.target.value === 'altro';
    console.log(this.newCategoryInsert);
  }
  onSelectColoreChange(event:any):void{
    this.newColorInsert = event.target.value ==='altro';
    console.log(this.newColorInsert); 
  }
  registraCategoria(){
    this.categoria.descrizione = this.descrizioneCategoria;
    this.shoesService.postCategory(this.categoria);
  }
  salvaColore(coloreNuovo:IcolorDb){
    console.log(coloreNuovo);
    // this.coloreNuovo.colore  vedere questa funzione xk da undefined 
    
    // this.nuoviColori.push({id:coloreNuovo.id, colore:coloreNuovo.colore, esadecimale:coloreNuovo.esadecimale});
    // this.coloreNuovo.colore = '';
  }
  registraColori():void{
    console.log(this.nuoviColori);
    this.shoesService.postColori(this.nuoviColori).subscribe({ next : (response) =>{
      console.log(Response, response);},error:(error) => {
        console.log('Error:', error);
      }
    });
  }


}
