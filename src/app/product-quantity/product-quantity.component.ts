import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { Product } from './../models/product';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {

  @Input('product') product: Product;
	@Input('shopping-cart') shoppingCart: ShoppingCart;

	constructor(private cartService: ShoppingCartService) {}

	ngOnInit() {}

	addToCart() {
		this.cartService.addToCart(this.product);
	}

	removeFromCart() {
		this.cartService.removeFromCart(this.product);
	}
}
