import { IOrderDb } from "./orderData-interface.models"

export interface loginData{
    accessToken: string,
    user:{
        cap: string,
        citta: string,
        cognome: string,
        email: string,
        id:string,
        indirizzo: string,
        nome: string,
        paese: string,
        telefono: string,
        user: string
    }
}
export interface IProfiloUtenteDb{
    id:number,
    username:string,
    password:string,
    token:string,
}

export interface IUtenteDb{
    id:number,
    nome:string,
    cognome:string,
    profilo:IProfiloUtenteDb
    ordini: IOrderDb[]
}