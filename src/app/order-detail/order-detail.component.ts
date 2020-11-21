import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderServiceService } from '../order-service.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  baseUrl = "http://localhost:8080/order/";
  order;
  //checkout order
  taxAmount = 0;
  totalItemAmount = 0;
  totalBeforeTax = 0;
  taxCollected = 0
  orderTotalAmount = 0;
  shippingAmount = 0;
  cardNumbers = ""
  userId
  returnedItems = []
  returnParam = false
  isLoadDone = false;
  sucessfullCall;
  // order return
  totalReturnItemAmount = 0
  totalReturnBeforeTax
  orderReturnTotalAmount;
  dateFormat

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private service: OrderServiceService
  ) { }




  ngOnInit(): void {
    this.getURLParam();
    this.gettingParamInfo();
    this.getOrderById();
  }


  getURLParam() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.userId = params['id'];
      console.log(this.userId);
    });
  }
  orderStatus
  orderStatusText
  itemsReturned= false;
  getOrderById() {
    this.isLoadDone = false;

    this.service.getOrderById(this.userId).subscribe((response) => {
      console.log(response);

      if (response.status == 200) {
        this.sucessfullCall = true;
        this.isLoadDone = true;
        let d = response.body
        console.log(d)
        let dateNow = new Date(d.createDate)
        this.dateFormat = `${dateNow.getDate()}-${(dateNow.getMonth() + 1)}-${dateNow.getFullYear()}`
        this.order = d;
        this.shippingAmount = d.shippingAmount;
        this.orderReturnTotalAmount = d.shippingAmount;
        this.cardNumbers = this.order.paymentDetails[0].cardNumber.substr(this.order.paymentDetails[0].cardNumber.length - 4)
        this.orderStatus = d.orderStatus;
        this.getOrderStatusText(this.orderStatus);
        this.order.orderDetailList.map(item => {
          this.taxAmount += item.taxAmount || 0;
          this.totalItemAmount += item.itemTotalAmount || 0;


        })
        this.totalBeforeTax = this.totalItemAmount + (this.shippingAmount | 0);
        this.orderTotalAmount = (this.totalItemAmount + this.shippingAmount + this.taxAmount);

      }
      else {
        this.sucessfullCall = false;
        this.isLoadDone = true;
        // alert("Unsucessfull Network call");
      }
    })
  }


  gettingParamInfo() {
    this.activatedRoute.paramMap.subscribe((d: any) => {
      console.log(d)
      if (d.params['return']) this.returnParam = true
      console.log(this.returnParam)
    })
  }


  prepareReturnOrderJson() {
    if (this.returnedItems.length == 0) {
      alert("Select Atleast 1 item to return");
    }
    else {
      let returnOrderJson = {
        "orderId": this.userId,
        "itemLists": this.returnedItems,

      }
      this.service.returnOrder(returnOrderJson).subscribe(response => {
        this.itemsReturned=true;
        this.getOrderById();
      })
      console.log(returnOrderJson)
    }
  }

  calculatingTotal() {
    this.returnedItems.map(returnitem => {
      this.totalReturnItemAmount += returnitem.quantity * returnitem.itemPrice;
    })
    this.orderReturnTotalAmount = this.totalReturnItemAmount + this.shippingAmount;
  }


  changeCheckbox(event, obj) {
    this.totalReturnItemAmount = 0;
    console.log(event)
    console.log(obj)

    if (event.target.checked) {
      this.returnedItems.push(obj);


    }
    else {
      let index = this.returnedItems.indexOf(obj);
      this.returnedItems.splice(index, 1);
    }

    console.log(this.returnedItems);

    this.calculatingTotal();

  }
  getOrderStatusText(status) {
    switch (status) {
      case 7:
        this.orderStatusText = "Return Initiated"
        break;
      case 8:
        this.orderStatusText = "Returned";
        break;
      default:
        break;
    }

    console.log(status);
    console.log(this.orderStatusText);
  }


}
