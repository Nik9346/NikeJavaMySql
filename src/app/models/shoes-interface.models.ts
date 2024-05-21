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