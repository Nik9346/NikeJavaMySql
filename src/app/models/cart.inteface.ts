import { IcolorDb } from "./color.interface";
import { IUtenteDb } from "./login-interface.models";
import { IShoesDb } from "./shoes-interface.models";
import { ITagliaDb } from "./taglia.interface";

export interface ICart {
  id?: number,
  utente?: IUtenteDb,
  scarpeCarrello?: IShoesCartDb[],
  importo?: number
}

//interfaccia utilizzata per mappare i dati del carrello ricevuti dal backend
export interface IShoesCartDb {
  id?: number,
  scarpa: IShoesDb,
  colore: IcolorDb,
  taglia: ITagliaDb,
  quantita?: number
}

//interfaccia utilizzata per aggiungere delle scarpe nel lista degli elementi carrello database
export interface IShoesItemAddToCart {
  id?: number
  scarpa: {
    id: number
  },
  colore: {
    id: number
  },
  taglia: {
    id: number
  },
  quantita?: number
}