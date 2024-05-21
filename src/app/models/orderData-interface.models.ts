import { IShoesSelected } from "./shoes-interface.models";

export interface IOrderData {
    orderItem : IShoesSelected[]
    orderNumber : number
}