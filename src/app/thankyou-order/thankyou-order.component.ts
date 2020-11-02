import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-thankyou-order',
  templateUrl: './thankyou-order.component.html',
  styleUrls: ['./thankyou-order.component.css']
})
export class ThankyouOrderComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private router:Router) { }
  userId
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.userId = params['id'];
     console.log(this.userId);
   });
  }

  routeToViewOrder() {
    this.router.navigate(['/order-detail'], { queryParams: { id: this.userId }});
  }

}
