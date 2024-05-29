import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrderData } from '../models/orderData-interface.models';

@Injectable({
  providedIn: 'root'
})
export class DataPostService {

  constructor(private http: HttpClient) { }

  postData(token, order) {
    const accessToken = token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })
    // return this.http.post('http://localhost:3000/posts',order,{headers})
    return this.http.post('https://json-server-nikeangular.onrender.com/posts',order,{headers})
  }
  getData(token, idUser, orderData:IOrderData[]){
    const accessToken = token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })
    //  return this.http.get(`http://localhost:3000/posts/?userId=${idUser}`, {headers})
     return this.http.get(`https://json-server-nikeangular.onrender.com/posts/?userId=${idUser}`, {headers})
  }

  
  postProductData(token,idUser){
    const accessToken = token
    // data.userId = idUser
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    })
    // return this.http.get(`http://localhost:3000/users/${idUser}`, {headers})
    return this.http.get(`https://json-server-nikeangular.onrender.com/users/${idUser}`, {headers})
  }

}
