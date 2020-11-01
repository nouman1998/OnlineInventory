import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { ThankyouOrderComponent } from './thankyou-order/thankyou-order.component';

// import { CarouselModule, WavesModule } from 'angular-bootstrap-md'

@NgModule({
  declarations: [
    AppComponent,
    CheckoutComponent,
    OrderDetailComponent,
    ThankyouOrderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    IvyCarouselModule,
    CommonModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
