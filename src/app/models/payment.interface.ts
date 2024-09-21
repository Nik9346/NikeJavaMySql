export interface IPayment{
    id?: number,
    metodoPagamento: string,
    numeroCarta?: string,
    cvv?: number,
    dataScadenza?: Date,
    importo: number
}