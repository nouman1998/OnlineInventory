import { Component, OnInit } from '@angular/core';
import { Checkout } from './checkout';
import { HttpClient } from '@angular/common/http';
import { ɵINTERNAL_BROWSER_PLATFORM_PROVIDERS } from '@angular/platform-browser';
import { Coupon } from './coupon';
import csc from 'country-state-city'
import { Router } from '@angular/router';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) { }
  address = {}
  myform
  isSaving = false;
  firstButtonSelected = true;
  deliveryInstrution=""
  secondButtonSelected = false;
  shippingMethod="1"
  backupTotalOrderAmount
  notificaionId="1"
  initialAddress = {
    id: 1, "firstName": "Shahzad",
    "middleName": "test",
    "lastName": "Iqbal",
    "phone": "test",
    "email": "n@n.com",
    "addressLine1": "House S-33 Street 4 Allama Iqbal Colony Mehmoodabad Gate KHI ACHa",
    "addressLine2": "test",
    "city": "test",
    "zipCode": "test",
    "state": "test",
    "country": "test",
  }

  localUrl = 'http://localhost:8080/order/';
  countries
  totalOrderAmount = 0
  ngOnInit(): void {

    this.countries = this.getCountries()
    console.log(csc.getAllCountries())

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

    this.orderJson['items'] = [
      {
        "productId": "2345",
        "itemId": "4",
        "itemDetail": "description",
        "itemImageUrl": "http://nknv.jpg",
        "quantity": 5,
        "price": 200,
        "total": 1050
      },
      {
        "productId": "17838",
        "itemId": "5",
        "itemDetail": "description",
        "itemImageUrl": "http://nk2nv.jpg",
        "quantity": 5,
        "price": 200,
        "total": 1050
      }
    ];
    this.getTotalOrderAmount()
  }
  getTotalOrderAmount() {
    this.totalOrderAmount = 0;
    this.orderJson['items'].map(item => {
      this.totalOrderAmount += ((item.price) * (item.quantity))

    })
    this.backupTotalOrderAmount=this.totalOrderAmount
  }
  radioButton
  isShippingAddressSame = false
  coupon = new Coupon();
  orderJson = {}
  checkout = new Checkout();
  saved = false
  addressArray = [
    this.initialAddress,

  ]
  provinces
  cities
  provinceChange(): void {

    this.cities = csc.getCitiesOfState(this.checkout.state);
    // this.checkout.state = provinceObj.value.name
    console.log(this.cities);


  }
  getCountries() {
    return [
      { id: "166", sortname: "PK", name: "Pakistan", phonecode: "92" },
      { id: "101", sortname: "IN", name: "India", phonecode: "91" },
      { id: "191", sortname: "SA", name: "Saudi Arabia", phonecode: "966" },
      { id: "196", sortname: "SG", name: "Singapore", phonecode: "65" },
      { id: "202", sortname: "ZA", name: "South Africa", phonecode: "27" },
      { id: "206", sortname: "LK", name: "Sri Lanka", phonecode: "94" }
    ]
  }
  countryChange(): void {

    console.log(this.checkout.country);
    this.provinces = csc.getStatesOfCountry(this.checkout.country)


    this.cities = null


  }
  saveShippingAddress(funnyDayaForm) {
    console.log(this.checkout)
    let item = {
      "id": this.addressArray.length + 1,
      "firstName": this.checkout.firstName,
      "middleName": this.checkout.middleName,
      "lastName": this.checkout.lastName,
      "phone": this.checkout.phoneNumber,
      "email": this.checkout.email,
      "addressLine1": this.checkout.address,
      "addressLine2": this.checkout.address1,
      "zipCode": this.checkout.pincode,
      "city": csc.getCityById(this.checkout.city).name,

      "state": csc.getStateById(this.checkout.state).name,
      "country": csc.getCountryById(this.checkout.country).name
    };
    this.addressArray.unshift(item)
    // this.addressArray.push(item)
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
    this.address['shipToAddress'] = { ...billToAddress }
    // this.address["billToAddress"] = {...billToAddress};
    // this.myform.reset()
    console.log(funnyDayaForm)
    funnyDayaForm.reset()
      ; this.isSaving = true;
    setTimeout(() => { this.isSaving = false; }, 100);

    //  this.eraseFormData();
  }
  billingAddress = [this.initialAddress]
  saveBillingAddress(funnyDayaForm) {
    console.log(this.checkout)
    let item = {
      "id": this.addressArray.length + 1,
      "firstName": this.checkout.firstName,
      "middleName": this.checkout.middleName,
      "lastName": this.checkout.lastName,
      "phone": this.checkout.phoneNumber,
      "email": this.checkout.email,
      "addressLine1": this.checkout.address,
      "addressLine2": this.checkout.address1,
      "zipCode": this.checkout.pincode,
      "city": csc.getCityById(this.checkout.city).name,

      "state": csc.getStateById(this.checkout.state).name,
      "country": csc.getCountryById(this.checkout.country).name
    };
    this.billingAddress.unshift(item)
    // this.billingAddress.push(item)
    // this.addressArray.push(item)
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
    this.address['billToAddress'] = { ...billToAddress }
    // this.address["billToAddress"] = {...billToAddress};
    // this.myform.reset()
    console.log(funnyDayaForm)
    funnyDayaForm.reset()
  }
  myFunction(item) {
    // debugger
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
    this.address["shipToAddress"] = { ...shipToAddress };



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
      this.address["billToAddress"] = { ...billToAddress };


      console.log(this.address);
    }

  }
  postOrder() {
    console.log(this.isShippingAddressSame)
    console.log(this.address['billToAddress'])

    if (this.isShippingAddressSame == false && !this.address['billToAddress']) {
      alert("Select Billing Addres First")
    }
    else {
      this.preparingJson();
      this.http.post(this.localUrl, this.orderJson).subscribe();
      setTimeout(() => {
        this.router.navigate(['thankyou'])
      }, 500);

      console.log("Posting Order", this.orderJson);
    }
  }

  preparingJson() {
    this.orderJson['address'] = this.address;
    this.orderJson['deliveryInstruction']=this.deliveryInstrution;
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
    this.orderJson['notificationId'] = this.notificaionId;
    this.orderJson['shippingMethod'] = this.shippingMethod;
    this.orderJson['shippingAmt'] = "50";

    this.orderJson['couponDetail'] = {
      "couponName": this.coupon.name,
      "discountType": "",
      "discountAmt": ""
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
      "totalPrice":""
    }

    console.log("bbbbbbbb", this.orderJson)

  }


  checkingToggle() {

    this.secondButtonSelected = false;
    this.firstButtonSelected = true
    this.isShippingAddressSame = !this.isShippingAddressSame;
    console.log(this.isShippingAddressSame);
    if (!this.isShippingAddressSame) {


    }
    else {
      this.address['billToAddress'] = { ...this.address['shipToAddress'] };
    }

  }

  eraseFormData() {
    this.checkout.email = "";
    this.checkout.firstName = "";
    this.checkout.lastName = "";
    this.checkout.middleName = "";
    this.checkout.phoneNumber = "";
    this.checkout.landmark = "";
    this.checkout.city = "";
    this.checkout.state = "";
    this.checkout.country = "";
    this.checkout.other = "";
    this.checkout.pincode = "";
    this.checkout.street = "";
    this.checkout.address1 = ""
    this.checkout.address = ""
  }
  hello(obj) {
    console.log(obj)
  }


  changeFunction = false
  toggleChange() {
    this.changeFunction = true;

  }
  changeBillingFunction = false
  toggleBillingChange() {
    this.changeBillingFunction = true;
  }







  toggleSelection() {
    this.firstButtonSelected = !this.firstButtonSelected;
    this.secondButtonSelected = !this.secondButtonSelected;
  }
  id = 1
  routeToViewOrder() {
    // this.router.navigate(['order-detail?id=46'])
    this.router.navigate(['/order-detail'], { queryParams: { id: 46 }});
  }
  routeToReturnOrder() {
    this.router.navigate(['order-detail/return'],{ queryParams: { id: 46 }})
  }

  couponArray = [
    { name: "code50", type: "percent", amount: 50 },
    { name: "code30", type: "flat", amount: 30 }
  ]
  isCouponMatched = false;


  checkCoupon() {
    this.isCouponMatched = false;
    this.couponArray.map(item => {
      if (item.name === this.coupon.name) {
        this.isCouponMatched = true;
        if (item.type == "percent") {
          this.totalOrderAmount -= ((this.totalOrderAmount / 100) * item.amount)
        }
        else if (item.type == "flat") {
          this.totalOrderAmount -= item.amount
        }

      }
    });
    if (!this.isCouponMatched) {
      alert("Invalid Coupon Code")
    }

  }

  cancelCoupon() {
    this.isCouponMatched = false;
    this.totalOrderAmount = this.backupTotalOrderAmount;
  }
}
