import { OrderService } from 'src/app/order.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  orders$;

  constructor(private orderService: OrderService) { }

  async ngOnInit() {
    this.orders$ = await this.orderService.getAll();
  }

}
