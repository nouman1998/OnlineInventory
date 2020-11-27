import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AngularConfirmModalModule } from 'angular-confirm-modal';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { ThankyouOrderComponent } from './thankyou-order/thankyou-order.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatPaginatorModule} from '@angular/material/paginator'
import { OrderListComponent } from './order-list/order-list.component';
import {MatFormFieldModule } from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {  MatInputModule } from '@angular/material/input';

import {MatDatepickerModule } from '@angular/material/datepicker';
// import {MatNativeDateModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { ReactiveFormsModule  } from '@angular/forms'
import { OrderServiceService } from './order-service.service';
// import {MatDialogModule} from '@angular/material/dialog';


// import { CarouselModule, WavesModule } from 'angular-bootstrap-md'

@NgModule({
  declarations: [
    AppComponent,
    CheckoutComponent,
    OrderDetailComponent,
    ThankyouOrderComponent,
    OrderListComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    IvyCarouselModule,
    CommonModule,
    NoopAnimationsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatTableModule
    ,MatDatepickerModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatInputModule,
    MatProgressSpinnerModule,
    // MatDialogModule,
    AngularConfirmModalModule.forRoot({})
  ],
  exports:[
    MatFormFieldModule,MatInputModule
  ],
  providers: [DatePipe, OrderServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
