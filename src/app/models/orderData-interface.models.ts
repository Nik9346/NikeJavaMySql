import { IAddressDb } from "./address.interface";
import { IUtenteDb } from "./login-interface.models";
import { IPayment } from "./payment.interface";
import { IScarpaOrdinataDb, IShoesSelected } from "./shoes-interface.models";

export interface IOrderData {
    orderItem : IShoesSelected[]
    orderNumber : number
}

export interface IOrderDb{
    id?:number,
    speseSpedizione: number,
    importo: number,
    indirizzo: IAddressDb,
    pagamento: IPayment
}