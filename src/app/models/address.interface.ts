//Interfaccia utilizzata per gli indirizzi nel db
export interface IAddressDb{
    id?: number,
    indirizzo: string,
    civico: string,
    cap: string,
    citta: string,
    provincia: string,
    paese: string
}