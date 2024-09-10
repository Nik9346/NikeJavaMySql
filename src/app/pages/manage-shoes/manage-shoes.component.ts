import { Component } from '@angular/core';
import { ICategory } from '../../models/category.interface';
import { ShoesService } from '../../services/shoes.service';
import { IColor, IcolorDb } from '../../models/color.interface';
import { ITagliaDb } from '../../models/taglia.interface';
import { IShoes, IShoesDb, IShoesDbForSave } from '../../models/shoes-interface.models';
import { UntypedFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-manage-shoes',
  templateUrl: './manage-shoes.component.html',
  styleUrl: './manage-shoes.component.sass'
})
export class ManageShoesComponent {

  bestSeller: number;
  nuovoArrivo: boolean = false
  scarpa: IShoesDbForSave = undefined
  nomeScarpa: string;
  prezzo: number;
  descrizioneScarpa: string;

  //scelta e inserimento categoria
  categorie: ICategory[] = [];
  newCategoryInsert: boolean = false;
  categoriaSelezionata: ICategory;
  categoria: ICategory = { id: null, descrizione: "" };
  categoriaInserita: string;
  categoriaNuova: ICategory;

  //scelta e inserimento nuovo colore
  colori: IcolorDb[] = [];
  newColorInsert: boolean = false;
  coloreInserito: string
  coloriNuovi: IcolorDb[] = [];
  coloriSelezionati: IcolorDb[] = []
  coloriConfermati: IcolorDb[] = []

  //scelta e inserimento nuova taglia
  taglieDisponibili: ITagliaDb[] = []
  newTagliaInsert: boolean = false;
  tagliaInserita: number;
  taglieNuove: ITagliaDb[] = [];
  taglieSelezionate: ITagliaDb[] = [];
  taglieConfermate: ITagliaDb[] = [];

  constructor(private shoesService: ShoesService) { };

  ngAfterViewInit() {
    this.shoesService.getCategory().subscribe((response) => {
      console.log(response);
      this.categorie = response;
    });
    this.shoesService.getColor().subscribe((response) => {
      this.colori = response;
    });
    this.shoesService.getTaglia().subscribe((response) => {
      this.taglieDisponibili = response;
    });
  }

  onSelectCategoryChange(event: any): void {
    this.newCategoryInsert = event.target.value === 'altro';
    const categoria = event.target.value;
    const categoriaOggetto: ICategory = this.categorie.find((e) => e.id === +categoria);
    this.categoriaSelezionata = categoriaOggetto;
  }
  salvaCategoria(){
    this.categoriaNuova = {id:null, descrizione: this.categoriaInserita}
    this.categoriaInserita = ''
  }
  registraNuovaCategoria() {
    this.shoesService.postCategory(this.categoriaNuova).subscribe();
    this.newCategoryInsert = false
    setTimeout(() => {
      this.shoesService.getCategory().subscribe((response)=>{
        this.categorie = response
      })      
    }, 1000);
  }
  //aggiunta nuovi colori e salvataggio + conferma colori selezionati

  //Inserimento e registrazione su db nuovi colori + aggiornamento array colori disponibili
  onSelectColoreChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.newColorInsert = checkbox.checked;
  }
  salvaNuovoColore() {
    this.coloriNuovi.push({ id: null, colore: this.coloreInserito, esadecimale: null })
    this.coloreInserito = "";
    console.log(this.coloriNuovi);
  }
  registraNuoviColori(): void {
    console.log(this.coloriNuovi);
    this.shoesService.postColori(this.coloriNuovi).subscribe((response) => {
      console.log(response);
    });
    this.coloriNuovi = []
    setTimeout(() => {
      this.shoesService.getColor().subscribe((response) => {
        this.colori = response
      });
    }, 1000);
  }
  // Salvataggio colori selezionati per la scarpa
  onSelectColore(event: any) {
    const color = event.target.value
    console.log(color);
    if (event.target.checked) {
      const coloreOggetto = this.colori.find((e) => e.id === +color);
      this.coloriSelezionati.push(coloreOggetto);
      this.newColorInsert = false;
    } else {
      const index = this.coloriSelezionati.indexOf(color);
      this.coloriSelezionati.splice(index, 1)
    }
  }
  registraColoriScarpa() {
    // for (let index = 0; index < this.coloriSelezionati.length; index++) {
    //   const element = this.coloriSelezionati[index]
    //   this.coloriConfermati.push({ id: element.id, colore: element.colore, esadecimale: element.esadecimale});
    // }
    this.coloriSelezionati.map((element) => {
      this.coloriConfermati.push(element)
    })
  }

  //inserimento taglia nuova + scelta e conferma taglie per scarpa
  //inserimento e registrazione nel database nuova taglia + aggiornamento array taglie disponibili
  onSelectTagliaInsert(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.newTagliaInsert = checkbox.checked;
  }
  salvaNuovaTaglia() {
    this.taglieNuove.push({ id: null, taglia: this.tagliaInserita });
    this.tagliaInserita = null
    console.log(this.taglieNuove);
  }
  registraNuovaTaglia() {
    this.shoesService.postTaglie(this.taglieNuove).subscribe((response) => {
      console.log(response);
    })
    this.taglieNuove = []
    setTimeout(() => {
      this.shoesService.getTaglia().subscribe((response) => {
        this.taglieDisponibili = response
      })
    }, 1000);
  }

  //salvataggio taglie selezionate + ??invio al database??
  onSelectTaglia(event: any) {
    const tagliaId = event.target.value
    if (event.target.checked) {
      const tagliaOggetto = this.taglieDisponibili.find((e) => e.id === +tagliaId);
      this.taglieSelezionate.push({ id: tagliaOggetto.id, taglia: tagliaOggetto.taglia });
    } else {
      const index = this.taglieSelezionate.indexOf(tagliaId);
      this.taglieSelezionate.splice(index, 1);
    }
  }
  registraTaglieScarpa() {
    this.taglieSelezionate.forEach(element => {
      this.taglieConfermate.push(element);
    });
  }

  newArrivo(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.nuovoArrivo = checkbox.checked
  }
  salvaDatiScarpa(){
    this.scarpa = {
      id: null,
      nome: this.nomeScarpa,
      prezzo: this.prezzo,
      descrizione: this.descrizioneScarpa,
      immagine: null,
      categoria: this.categoriaSelezionata,
      bestSeller: this.bestSeller,
      nuovoArrivi: this.nuovoArrivo,
      taglie: this.taglieConfermate,
      colori: this.coloriConfermati
    }
  }
  registraDatiScarpa() {
    this.shoesService.postShoes(this.scarpa).subscribe((response) => {
      console.log(response);
    })
  }
}