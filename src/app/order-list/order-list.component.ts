import {OnInit,AfterViewInit, Component, ViewChild, Injectable} from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator'
// import {OrderserviceService} from '../orderservice.service';

import { Router } from '@angular/router';
import {animate, state, style, transition, trigger} from '@angular/animations';
// import {MatCalendarCellClassFunction} from '@angular/material/datepicker';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { ɵINTERNAL_BROWSER_PLATFORM_PROVIDERS } from '@angular/platform-browser';
import {DatePipe} from '@angular/common';
import { OrderServiceService } from '../order-service.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class OrderListComponent {
  orderSearch;
  currentDate = new Date();
  fromDateError='';
  toDateError='';


  displayedColumns = ['order_id','orderTotalAmount','statusDesc','orderDate', 'deliDate','action'];
  displayedColumn = ['order_id','orderTotalAmount','statusDesc','orderDate', 'deliDate'];
  dataSource: MatTableDataSource<orderListData>;
  public orderList = [];
  expandedElement: orderListData | null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  expanded = [];



  //date = new FormControl(new Date());
  //serializedDate = new FormControl((new Date()).toISOString());

  constructor(private orderService: OrderServiceService, private router: Router, private datePipe: DatePipe) { }

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.orderSearch.fromDate = new Date(this.currentDate.getFullYear(),
    this.currentDate.getMonth()-6,
    this.currentDate.getDate());
    this.orderSearch.toDate = this.currentDate;
    this.getOrderList();
  }

  ngOnInit(){

    this.orderSearch = new FormGroup({
      toDate: new FormControl(this.currentDate,Validators.compose([
        Validators.required
     ])),
      fromDate:new FormControl(new Date(this.currentDate.getFullYear(),
      this.currentDate.getMonth()-6,
      this.currentDate.getDate()),Validators.compose([
        Validators.required
     ]))
   });
    for(var i: number = 0; i < this.orderList.length; i++) {
      this.expanded[i] = false;
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  onClickSubmit(data) {
    this.orderSearch.fromDate = data.fromDate;
    this.orderSearch.toDate = data.toDate;

    this.fromDateError=this.getErrorMessage(this.orderSearch.fromDate);

    this.getOrderList();
 }

  onClickAction(data) {alert(data);
       //this.router.navigate(['/order-detail'], { queryParams: { id: data }});
       this.orderService.cancelOrder(data).subscribe((response) => {
        console.log(response);
       })
  }

  routeToReturnOrder(data) {
    this.router.navigate(['order-detail/return'],{ queryParams: { id: data }})
  }

  getOrderList(){
    let newFromDate = this.datePipe.transform(new Date(this.orderSearch.fromDate),"yyyy-MM-dd HH:mm:ss.SSS");
    let newToDate   = this.datePipe.transform(new Date(this.orderSearch.toDate),"yyyy-MM-dd HH:mm:ss.SSS");

    this.orderService.getOrderList(1, newFromDate, newToDate).subscribe((data) => {
      this.orderList = Array.from(Object.keys(data), k=>data[k]);
      console.log(this.orderList);
      this.dataSource = new MatTableDataSource(this.orderList);

      this.dataSource.filterPredicate = (data: orderListData, filter: string) => {
        return data.order_id == filter;
       };
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  })
  }

  getErrorMessage(pickerInput: string): string {alert(pickerInput);
    if (!pickerInput || pickerInput === '' ) {
      return 'Please choose a date.';
    }
    return this.isMyDateFormat(pickerInput);
  }

  isMyDateFormat(date: string): string {
    if (date.length !== 10) {
      return 'Invalid input: Please input a string in the form of MM/DD/YYYY';
    } else {
      return 'test error';
    }
    return 'Unknown error.';
  }

}

export interface orderListData {
  order_id: string;
  orderTotalAmount: string;
  statusDesc: string;
  orderDate: string;
  deliDate: string;
  action: string;
}
