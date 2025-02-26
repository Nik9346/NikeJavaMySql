import { ICategory } from "./category.interface"
import { IcolorDb } from "./color.interface"
import { IOrderDb } from "./orderData-interface.models"
import { ITagliaDb } from "./taglia.interface"

export interface IShoes {
    id: number
    nome: string
    categoria: string
    prezzo: number
    taglie_disponibili: string[]
    colori_disponibili: string[]
    taglia_selezionata: string
    colore_selezionato: string
    descrizione: string
    immagine: string
    nuovo_arrivi: boolean
    best_seller: number
    quantita: number
  }

export interface IShoesSelected {
    id: number
    nome: string
    categoria: string
    prezzo: number
    taglie_disponibili: string[]
    colori_disponibili: string[]
    taglia_selezionata: string
    colore_selezionato: string
    descrizione: string
    immagine: string
    nuovo_arrivi: boolean
    best_seller: number
    quantita:number
}
//interfaccia di dialogo con Db in fase di presentazione json scarpa DTO
export interface IShoesDb{
  id:number,
  nome: string,
  prezzo: number,
  descrizione: string,
  immagine: string,
  categoria: ICategory,
  bestSeller: number,
  nuovoArrivi: boolean
  taglie:string[]
  colori:string[]
}
//interfaccia di dialogo db in fase di salvataggio scarpa
export interface IShoesDbForSave{
  id?:number,
  nome: string,
  prezzo: number,
  descrizione: string,
  immagine: string,
  categoria: ICategory,
  bestSeller: number,
  nuovoArrivi: boolean
  taglie:ITagliaDb[]
  colori:IcolorDb[]
}
//Intefaccia di dialogo db in fase di ricezione dati scarpa ordinata
export interface IScarpaOrdinataDb{
  id:number,
  quantità:number,
  scarpa:IShoesDb,
  ordine:IOrderDb
}

