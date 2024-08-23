import { IUtenteDb } from "./login-interface.models";
import { IScarpaOrdinataDb, IShoesSelected } from "./shoes-interface.models";

export interface IOrderData {
    orderItem : IShoesSelected[]
    orderNumber : number
}

export interface IOrderDb{
    in:number,
    data:Date,
    importo:number,
    utente:IUtenteDb,
    scarpaOrdinata: IScarpaOrdinataDb

}