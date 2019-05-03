import { Subscription } from 'rxjs';
import { OrderService } from 'src/app/order.service';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit, OnDestroy {

  orders$;
  userId: string;
  userSubscription: Subscription;

  constructor(private authService: AuthService, private orderService: OrderService) { }

  async ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
     this.orders$ = await this.orderService.getOrdersByUser(this.userId);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
