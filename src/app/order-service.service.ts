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
  private apiurl = this.baseUrl + "order/getCustAddress/";
  private orderListUrl = this.baseUrl + "order/getOrderListForAdmin?";
  private orderDetailUrl = this.baseUrl + "order/getOrderDetail?";
  private saveOrderUrl = this.baseUrl + "order/saveAddress";
  private cancelOrderUrl = this.baseUrl + 'order/cancelOrder/';
  private getOrderByIdUrl = this.baseUrl + 'order/';
  private postOrderUrl = this.baseUrl + 'order/';
  private returnOrderUrl = this.baseUrl +"order/returnOrder"

  getOrderById(id): Observable<any> {
    return this.http.get(this.getOrderByIdUrl + id, { observe: 'response' })
  }

  postOrder(body): Observable<any> {
    return this.http.post(this.postOrderUrl, body, { observe: 'response' });
  }
  getOrderList(custId: number, startDate: String, endDate: String) {
    var ss = '';
    if (custId != null && custId != 0)
      ss = ss + 'createdBy=' + custId;

    if (startDate != null) {
      if (ss != '') ss = ss + '&startDate=' + startDate;
      else ss = ss + 'startDate=' + startDate;
    }

    if (endDate != null) {
      if (ss != '') ss = ss + '&endDate=' + endDate;
      else ss = ss + 'endDate=' + endDate;
    }
    return this.http.get(this.orderListUrl + ss);
  }


  getCustomerAddress(custId: number) {
    return this.http.get(this.apiurl + custId);
  }

  postCustomerAddress(obj) {
    return this.http.post(this.saveOrderUrl, obj);
  }
  returnOrder(obj)

  {
    console.log(this.returnOrderUrl);

    return this.http.put(this.returnOrderUrl,obj);
  }
  cancelOrder(id): Observable<any> {alert(this.cancelOrderUrl + id)
    return this.http.put(this.cancelOrderUrl + id, { observe: 'response' })
  }
  getOrderDetail(orderId: number) {
    return this.http.get(this.orderDetailUrl+orderId);
}
}
