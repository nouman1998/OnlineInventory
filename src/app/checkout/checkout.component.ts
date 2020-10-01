import { Component, OnInit } from '@angular/core';
import { Checkout } from './checkout';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private http: HttpClient) { }
  address = {}

  localUrl = 'http://localhost:8080/order/';

  ngOnInit(): void {
  }
  radioButton
  isShippingAddressSame = true
  orderJson={}
  checkout = new Checkout();
  saved = false
  addressArray = [
    {
      id: 1, "firstName": "test",
      "middleName": "test",
      "lastName": "test",
      "phone": "test",
      "email": "n@n.com",
      "addressLine1": "test",
      "addressLine2": "test",





      "city": "test",
      "zipCode": "test",
      "state": "test",
      "country": "test",
    },



  ]
  saveAddress() {
    console.log(this.checkout)
    this.addressArray.push({
      "id": this.addressArray.length + 1, "firstName": this.checkout.name,
      "middleName": this.checkout.middleName,
      "lastName": this.checkout.lastName,
      "phone": this.checkout.phoneNumber,
      "email": this.checkout.email,
      "addressLine1": this.checkout.address,
      "addressLine2": this.checkout.address1,
      "city": this.checkout.city,
      "zipCode": this.checkout.pincode,
      "state": this.checkout.state,
      "country": this.checkout.country
    })

    this.saved = true;
    setTimeout(() => { this.saved = false; }, 3000);
  }
  myFunction(item) {
    console.log(item)
    this.radioButton = !this.radioButton

    let billToAddress = {
      "firstName": item.firstName,
      "middleName": item.middleName,
      "lastName": item.lastName,
      "phone": item.phone,
      "email": item.email,
      "addressLine1": item.addressLine1,
      "addressLine2": item.addressLine2,
      "city": item.city,
      "zipCode": item.pincode,
      "state": item.state,
      "country": item.country,
    }
    this.address["billToAddress"] = billToAddress;

    if (this.isShippingAddressSame) {
      this.address["shipToAddress"] = billToAddress;
    }
    console.log(this.address)
  }

  myFunction1(item) {
    if (!this.isShippingAddressSame) {
      let shipToAddress = {
        "firstName": item.firstName,
        "middleName": item.middleName,
        "lastName": item.lastName,
        "phone": item.phoneNumber,
        "email": item.email,
        "addressLine1": item.address,
        "addressLine2": item.address1,
        "city": item.city,
        "zipCode": item.pincode,
        "state": item.state,
        "country": item.country,
      }
      this.address["shipToAddress"] = shipToAddress;

      console.log(this.address);
    }

  }
  postOrder() {

    this.preparingJson();
    this.http.post(this.localUrl,this.orderJson).subscribe();
    console.log("Posting Order");
  }

  preparingJson() {
    this.orderJson['address']=this.address;
    this.orderJson['customerDetail'] = {
      "customerId": 1,
      "firstName": "test",
      "middleName": "",
      "lastName": "test",
      "phone": "9898989898",
      "email": "test@test.com",
      "addressLine1": "",
      "addressLine2": "",
      "city": "",
      "zipCode": "",
      "state": "",
      "country": ""
    }

    this.orderJson['orderTotal'] = '';
    this.orderJson['orderStatus'] = 1;
    this.orderJson['paymentStatus'] = "";
    this.orderJson['notificationId'] = 2;
    this.orderJson['shippingMethod'] = "";
    this.orderJson['shippingAmt'] = "";
    this.orderJson['items'] = [

      {
        "itemId": 1,
        "itemSize": "12",
        "quantity": 12,
        "price": 12,
        "tax": "",
        "couponCode": "",
        "discountType": "",
        "couponAmt": "",
        "itemTotal": "",
        "itemStatus": ""
      }

    ];
    this.orderJson['couponDetail'] = {
			"couponName":"",
			"discountType":"",
			"discountAmt":""
      };

      this.orderJson['paymentDetail']={
        "paymentType":"",
        "bankName":"",
        "accountNo":"",
        "ifscCode":"",
        "cardNumber":"",
        "cardUserName":"",
        "cardExpiryDate":"",
        "totalTax":"",
        "totalPrice":"",
        "totalAmount":""
        }

        console.log( "bbbbbbbb",this.orderJson)

  }

}
