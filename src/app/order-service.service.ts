import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from 'protractor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  constructor(private http: HttpClient) { }
  baseUrl = "http://localhost:8080/"
  private getOrderByIdUrl = this.baseUrl+'order/';
  private postOrderUrl =this.baseUrl+'order/';

  getOrderById(id):Observable<any>{
  return  this.http.get(this.getOrderByIdUrl+id,{observe: 'response'})
  }

  postOrder(body):Observable<any>{
    return this.http.post(this.postOrderUrl,body,{observe: 'response'});
  }
}
