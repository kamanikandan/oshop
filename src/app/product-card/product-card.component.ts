import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { Product } from './../models/product';
import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'product-card',
	templateUrl: './product-card.component.html',
	styleUrls: [ './product-card.component.css' ]
})
export class ProductCardComponent implements OnInit {
	@Input('product') product: Product;
	@Input('show-actions') cartShow: boolean = true;
	@Input('shopping-cart') shoppingCart: ShoppingCart;

	constructor(private cartService: ShoppingCartService) {}

	ngOnInit() {}

	addToCart() {
		this.cartService.addToCart(this.product);
	}
}