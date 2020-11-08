import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderListComponent } from './order-list/order-list.component';
import { ThankyouOrderComponent } from './thankyou-order/thankyou-order.component';


const routes: Routes = [
  {path:'order-detail',  component:OrderDetailComponent},
  {path:"order-list", component:OrderListComponent  },
  {path:"order-checkout", component:CheckoutComponent},

  {path:'order-detail/:return',  component:OrderDetailComponent},
  {path:'',  component:CheckoutComponent},
  {path:'thankyou', component:ThankyouOrderComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
