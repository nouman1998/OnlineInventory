import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  baseUrl = "http://localhost:8080/order";
  order;
  taxAmount = 0;
  totalItemAmount = 0;
  totalBeforeTax = 0;
  taxCollected = 0
  orderTotalAmount = 0;
  shippingAmount = 0;
  cardNumbers = ""
  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) { }
  returnParam = false
  ngOnInit(): void {
    this.gettingParamInfo();
    this.getOrderById();
  }
  getOrderById() {
    this.http.get(this.baseUrl + "/46").subscribe((d: any) => {
      console.log(d)

      this.order = d;
      this.shippingAmount = d.shippingAmount;
      this.cardNumbers= this.order.paymentDetails[0].cardNumber.substr(this.order.paymentDetails[0].cardNumber.length - 4)
      // this.taxAmount=this.order.orderDetailList.taxAmount||0;
      // this.totalItemAmount=this.order.orderDetailList.
      this.order.orderDetailList.map(item => {
        this.taxAmount += item.taxAmount || 0;
        this.totalItemAmount += item.itemTotalAmount || 0;


      })
      this.totalBeforeTax = this.totalItemAmount + (this.shippingAmount | 0);
      this.orderTotalAmount = (this.totalItemAmount + this.shippingAmount + this.taxAmount);

    })
  }
  gettingParamInfo() {
    this.activatedRoute.paramMap.subscribe((d: any) => {
      console.log(d)
      if (d.params['return']) this.returnParam = true
      console.log(this.returnParam)
    })
  }

}

