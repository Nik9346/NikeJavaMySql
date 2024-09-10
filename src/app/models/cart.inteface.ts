import { IUtenteDb } from "./login-interface.models";
import { IShoesCartDb } from "./shoes-interface.models";

export interface ICart{
    id?: number,
    utente:IUtenteDb,
    scarpeCarrello:IShoesCartDb[]
}