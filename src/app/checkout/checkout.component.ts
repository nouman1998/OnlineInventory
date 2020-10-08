import { Component, OnInit } from '@angular/core';
import { Checkout } from './checkout';
import { HttpClient } from '@angular/common/http';
import { ɵINTERNAL_BROWSER_PLATFORM_PROVIDERS } from '@angular/platform-browser';
import { Coupon } from './coupon';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private http: HttpClient) { }
  address = {}
  myform
  isSaving=false;
  firstButtonSelected = true  ;
  secondButtonSelected=false;
  shippingMethod
  notificationType
   initialAddress= {
    id: 1, "firstName": "Shahzad",
    "middleName": "test",
    "lastName": "Iqbal",
    "phone": "test",
    "email": "n@n.com",
    "addressLine1": "House S-33 Street 4 Allama Iqbal Colony Mehmoodabad Gate",
    "addressLine2": "test",
    "city": "test",
    "zipCode": "test",
    "state": "test",
    "country": "test",
  }

  localUrl = 'http://localhost:8080/order/';

  ngOnInit(): void {
    let item = this.initialAddress;
    let billToAddress = {
      "firstName": item.firstName,
      "middleName": item.middleName,
      "lastName": item.lastName,
      "phone": item.phone,
      "email": item.email,
      "addressLine1": item.addressLine1,
      "addressLine2": item.addressLine2,
      "city": item.city,
      "zipCode": item.zipCode,
      "state": item.state,
      "country": item.country,
    }
    this.address["billToAddress"] = billToAddress;
    this.address['shipToAddress'] = billToAddress;
    this.slides = this.chunk(this.cards, 3);

  }
  radioButton
  isShippingAddressSame = true
  coupon = new Coupon();
  orderJson = {}
  checkout = new Checkout();
  saved = false
  addressArray = [
  this.initialAddress,

  ]
  saveAddress(funnyDayaForm) {
    console.log(this.checkout)
    let item ={
      "id": this.addressArray.length + 1,
      "firstName": this.checkout.firstName,
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
    };
    // this.addressArray.unshift(item)
    this.addressArray.push(item)
    let billToAddress = {
      "firstName": item.firstName,
      "middleName": item.middleName,
      "lastName": item.lastName,
      "phone": item.phone,
      "email": item.email,
      "addressLine1": item.addressLine1,
      "addressLine2": item.addressLine2,
      "city": item.city,
      "zipCode": item.zipCode,
      "state": item.state,
      "country": item.country,
    }
    this.address['shipToAddress']={...billToAddress}
    this.address["billToAddress"] = {...billToAddress};
    // this.myform.reset()
    console.log(funnyDayaForm)
    funnyDayaForm.reset()
;    this.isSaving = true;
    setTimeout(() => { this.isSaving = false; }, 100);

  //  this.eraseFormData();
  }
  myFunction(item) {
    debugger
    console.log(item)
    this.radioButton = !this.radioButton

    let shipToAddress = {
      "firstName": item.firstName,
      "middleName": item.middleName,
      "lastName": item.lastName,
      "phone": item.phone,
      "email": item.email,
      "addressLine1": item.addressLine1,
      "addressLine2": item.addressLine2,
      "city": item.city,
      "zipCode": item.zipCode,
      "state": item.state,
      "country": item.country,
    }
    this.address["shipToAddress"] = {...shipToAddress};

    if (this.isShippingAddressSame) {
      this.address["billToAddress"] = {...shipToAddress};
    }

    console.log(this.address)
  }

  myFunction1(item) {
    debugger
    if (!this.isShippingAddressSame) {
      let billToAddress = {
        "firstName": item.firstName,
        "middleName": item.middleName,
        "lastName": item.lastName,
        "phone": item.phoneNumber,
        "email": item.email,
        "addressLine1": item.addressLine1,
      "addressLine2": item.addressLine2,
        "city": item.city,
        "zipCode": item.zipCode,
        "state": item.state,
        "country": item.country,
      }
      this.address["billToAddress"] = {...billToAddress};


      console.log(this.address);
    }

  }
  postOrder() {
    console.log(this.isShippingAddressSame)
    console.log(this.address['billToAddress'])

    if (this.isShippingAddressSame==false && !this.address['billToAddress'] ) {
      alert("Select Billing Addres First")
    }
    else {
      this.preparingJson();
      // this.http.post(this.localUrl, this.orderJson).subscribe();
      console.log("Posting Order", this.orderJson);
    }
  }

  preparingJson() {
    this.orderJson['address'] = this.address;
    this.orderJson['customerDetail'] = {
      "customerId": 1,
      "addressLine1": "test address 1",
      "addressLine2": "test address 2",
      "city": "karachi",
      "country": "Pakistan",
      "email": "s@s.com",
      "firstName": "shahzad",
      "lastName": "iqbal",
      "middleName": "mohammad",
      "phone": "123982212",
      "state": "Sindh",
      "zipCode": "00000"
    }

    this.orderJson['orderTotal'] = '';
    this.orderJson['orderStatus'] = 1;
    this.orderJson['paymentStatus'] = "";
    this.orderJson['notificationId'] = 2;
    this.orderJson['shippingMethod'] = this.shippingMethod;
    this.orderJson['shippingAmt'] = "";
    this.orderJson['items'] = [

      {
        "itemId": 4,
        "itemSize": "Small",
        "quantity": 10,
        "price": 1000,
        "tax": "",
        "couponCode": "",
        "discountType": "",
        "couponAmt": "",
        "itemTotal": "",
        "itemStatus": ""
      }

    ];
    this.orderJson['couponDetail'] = {
      "couponName": this.coupon.name,
      "discountType": this.coupon.discountType,
      "discountAmt":this.coupon.discountAmount
    };

    this.orderJson['paymentDetail'] = {
      "paymentType": "",
      "bankName": "",
      "accountNo": "",
      "ifscCode": "",
      "cardNumber": "",
      "cardUserName": "",
      "cardExpiryDate": "",
      "totalTax": "",
      "totalPrice": "",
      "totalAmount": ""
    }

    console.log("bbbbbbbb", this.orderJson)

  }
  // validateForm() {
  //   console.log(this.checkout)
  //   if (!this.checkout.address || (this.checkout.phoneNumber.length > 15 || this.checkout.phoneNumber.length == 0 || !this.checkout.phoneNumber) || !this.checkout.pincode ||
  //     !this.checkout.firstName || !this.checkout.country || !this.checkout.state || !this.checkout.city
  //   ) { return true }
  //   else { false }
  // }

  checkingToggle() {

    this.secondButtonSelected=false;
    this.firstButtonSelected=true
    this.isShippingAddressSame = !this.isShippingAddressSame;
    console.log(this.isShippingAddressSame);
    if (!this.isShippingAddressSame) {


    }
    else{
      this.address['billToAddress']={...this.address['shipToAddress']};
    }

  }

  eraseFormData(){
    this.checkout.email="";
    this.checkout.firstName="";
    this.checkout.lastName="";
    this.checkout.middleName="";
    this.checkout.phoneNumber="";
    this.checkout.landmark="";
    this.checkout.city="";
    this.checkout.state="";
    this.checkout.country="";
    this.checkout.other="";
    this.checkout.pincode="";
    this.checkout.street="";
    this.checkout.address1=""
    this.checkout.address=""
  }
  hello(obj)
  {
    console.log(obj)
  }








  cards = [
    {
      title: 'Card Title 1',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 2',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 3',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 4',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 5',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 6',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 7',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 8',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
    {
      title: 'Card Title 9',
      description: 'Some quick example text to build on the card title and make up the bulk of the card content',
      buttonText: 'Button',
      img: 'https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20(34).jpg'
    },
  ];

  slides: any = [[]];
  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }

  toggleSelection(){
    this.firstButtonSelected=!this.firstButtonSelected;
    this.secondButtonSelected=!this.secondButtonSelected;
  }
}
