import { Component, OnInit, ViewChild } from '@angular/core';
import { Checkout } from './checkout';
import { HttpClient } from '@angular/common/http';
import { ɵINTERNAL_BROWSER_PLATFORM_PROVIDERS } from '@angular/platform-browser';
import { Coupon } from './coupon';
import csc from 'country-state-city'
import { Router } from '@angular/router';
import { OrderServiceService } from '../order-service.service';
import { debug } from 'console';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  @ViewChild('exampleModal') public childModal;

  constructor(private http: HttpClient, private router: Router, private service: OrderServiceService) { }
  address = {}
  myform
  isSaving = false;
  itemQuantity=[]
  firstButtonSelected = true;
  deliveryInstrution = ""
  secondButtonSelected = false;
  shippingMethod = "1"
  backupTotalOrderAmount
  notificaionId = "1"
  totalTax=100;
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
  createdByCustomer = 1;
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
        "itemImageUrl": "http://pngimg.com/uploads/pentacle/pentacle_PNG51.png",
        "quantity": 5,
        "price": 200,
        "total": 1000
      },
      {
        "productId": "17838",
        "itemId": "5",
        "itemDetail": "description",
        "itemImageUrl": "http://pngimg.com/uploads/pentacle/pentacle_PNG51.png",
        "quantity": 5,
        "price": 200,
        "total": 1000
      }
    ];

    this.items=[...  this.orderJson['items']]
    this.orderJson['items'].map(item=>{
      this.itemQuantity.push(item.quantity)
    })
    this.getTotalOrderAmount()

    this.getCustomerAddress(this.createdByCustomer);

  }

  getCustomerAddress(customerId) {
    this.addressArray = [];
    this.service.getCustomerAddress(customerId).subscribe((addresses: any) => {
      console.log("ADRESSS", addresses)
      //  this.addressArray.push()
      this.initialAddress = addresses[0];
      // this.item=this.initialAddress;
      this.address['shipToAddress'] = this.initialAddress
      this.address['billToAddress'] = this.initialAddress

      // this.addressArray.push(this.initialAddress);
      addresses.map(address => {
        this.addressArray.unshift(address)
        this.billingAddress.unshift(address);
      })

    })
  }



  getTotalOrderAmount() {
    debugger

    this.totalOrderAmount = 0;
    this.orderJson['items'].map((item,index) => {

      this.totalOrderAmount += ((item.price) * (parseInt( this.itemQuantity[index])))
      item.quantity = (parseInt( this.itemQuantity[index]));

    })
    this.backupTotalOrderAmount = this.totalOrderAmount
    if(this.orderJson['items'].length==0)
    {
      this.totalOrderAmount=0;

      this.totalTax=0;
    }
    else{

      this.totalTax=100;
    }
    // this.totalOrderAmount=120
  }
  radioButton
  isShippingAddressSame = false
  coupon = new Coupon();
  orderJson = {}
  checkout = new Checkout();
  checkout1 = new Checkout();

  saved = false;
  monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  last = new Date(new Date().getTime() + (7 * 24 * 60 * 60 * 1000))
  deliveryDate = this.last.getDate() + " - " + this.monthNames[this.last.getMonth()] + " - " + this.last.getFullYear();
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
// totalOrderAmount

  }
  isAddressSaved = false;
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
      "createdBy": 1,
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

    /* "createdBy":1,
      "updatedBy":1,
      "cellNo":,
      "faxNo":,
      ""
      */
    let customerAddressDTO = { ...billToAddress }
    customerAddressDTO['createdBy'] = 1
    customerAddressDTO['updatedBy'] = 1
    customerAddressDTO['cellNo'] = item.phone;
    customerAddressDTO['faxNo'] = "abc";
    console.log(customerAddressDTO);






    this.service.postCustomerAddress(customerAddressDTO).subscribe(

    );
    this.address['shipToAddress'] = { ...billToAddress }
    // this.address["billToAddress"] = {...billToAddress};
    // this.myform.reset()
    console.log(funnyDayaForm)
    funnyDayaForm.reset()
      ; this.isSaving = true;
    this.childModal.hide();


    setTimeout(() => { this.isSaving = false; }, 100);

    //  this.eraseFormData();
  }
  billingAddress = []
  saveBillingAddress(funnyDayaForm) {
    console.log(this.checkout)
    let item = {
      "id": this.addressArray.length + 1,
      "firstName": this.checkout1.firstName,
      "middleName": this.checkout1.middleName,
      "lastName": this.checkout1.lastName,
      "phone": this.checkout1.phoneNumber,
      "email": this.checkout1.email,
      "addressLine1": this.checkout1.address,
      "addressLine2": this.checkout1.address1,
      "zipCode": this.checkout1.pincode,
      "city": csc.getCityById(this.checkout1.city).name,

      "state": csc.getStateById(this.checkout1.state).name,
      "country": csc.getCountryById(this.checkout1.country).name
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
    let customerAddressDTO = { ...billToAddress }
    customerAddressDTO['createdBy'] = 1
    customerAddressDTO['updatedBy'] = 1
    customerAddressDTO['cellNo'] = item.phone;
    customerAddressDTO['faxNo'] = "abc";
    console.log(customerAddressDTO);
    this.service.postCustomerAddress(customerAddressDTO).subscribe();
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

      this.service.postOrder(this.orderJson).subscribe(response => {
        console.log(response)
        if (response.status == 200) {
          setTimeout(() => {
            this.router.navigate(['thankyou'], { queryParams: { id: response.body } })
          }, 500);
        }
        else {
          alert("Posting Unsucessfull")
        }

      }, error => {
        alert("Something Went Wrong. Try Again")
      })


      console.log("Posting Order", this.orderJson);
    }
  }

  preparingJson() {
    this.orderJson['address'] = this.address;
    this.orderJson['deliveryInstruction'] = this.deliveryInstrution;
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

    this.orderJson['orderTotal'] = this.backupTotalOrderAmount;
    this.orderJson['orderStatus'] = 1;
    this.orderJson['paymentStatus'] = 1;
    this.orderJson['notificationId'] = this.notificaionId;
    this.orderJson['shippingMethod'] = this.shippingMethod;
    this.orderJson['shippingAmt'] = "50";
    this.orderJson['shippingId'] = this.shippingMethod;

    if (this.isCouponMatched) {
      this.orderJson['couponDetail'] = {
        "couponName": this.coupon.name,
        "discountType": this.discountType,
        "discountAmt": this.discountAmount
      };
    }
    else {
      this.orderJson['couponDetail'] = {
        "couponName": null,
        "discountType": null,
        "discountAmt": null
      };
    }
    this.orderJson['paymentDetail'] = {
      "paymentType": "1",
      "bankName": "Habib",
      "accountNo": "12345",
      "ifscCode": "123",
      "cardNumber": "123456",
      "cardUserName": "Nouman Ejaz",
      "cardExpiryDate": "22/03",
      "totalTax": this.totalTax,
      "totalPrice": this.totalOrderAmount
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
    this.router.navigate(['/order-detail'], { queryParams: { id: 46 } });
  }
  routeToReturnOrder() {
    this.router.navigate(['order-detail/return'], { queryParams: { id: 46 } })
  }

  couponArray = [
    { id: 1, name: "code50", type: "percent", amount: 50 },
    { id: 2, name: "code30", type: "flat", amount: 30 }
  ]
  isCouponMatched = false;

  discountAmount = 0;
  discountType
  checkCoupon() {
    this.discountAmount = 0
    this.isCouponMatched = false;
    this.couponArray.map(item => {
      if (item.name === this.coupon.name) {
        this.isCouponMatched = true;
        if (item.type == "percent") {
          this.discountAmount = ((this.totalOrderAmount / 100) * item.amount)
          this.discountType = item.id;
          this.totalOrderAmount -= this.discountAmount;
        }
        else if (item.type == "flat") {
          this.discountAmount = item.amount;
          this.discountType = item.id;
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
    this.coupon.name = "";
    this.coupon.discountAmount = 0;
    this.coupon.discountType = ""

  }




  changePhone(abc) {
    console.log(abc);

  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
items=[];
  changeCheckbox($event, obj){
    this.totalOrderAmount=0;
    console.log($event);

    if ($event.target.checked) {
      this.orderJson['items'].push(obj);


    }
    else {
      let index = this.orderJson['items'].indexOf(obj);
      this.orderJson['items'].splice(index, 1);
    }
    this.getTotalOrderAmount();

  }

  abc(){
    this.getTotalOrderAmount()
    console.log(this.itemQuantity);

  }
}
