import { ShoppingCart } from './../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import { Subscription, Observable } from 'rxjs';

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: [ './products.component.css' ]
})
export class ProductsComponent implements OnInit {
	products;
	filteredProducts;
	category: string;
	cartCount$: Observable<ShoppingCart>;

	constructor(
		private route: ActivatedRoute, 
		private productService: ProductService, 
		private cartService: ShoppingCartService) {
		
	}

	async ngOnInit() {
		this.cartCount$ = (await this.cartService.getCart());
		this.populateProduct();
	}

	private populateProduct() {
		this.productService
		.getAll()
		.switchMap((p) => {
			this.products = p;
			return this.route.queryParamMap;
		})
		.subscribe((params) => {
			this.category = params.get('category');
			this.productFilter();
		});
	}

	private productFilter() {
		this.filteredProducts = this.category
		? this.products.filter((p) => p.category == this.category)
		: this.products;
	}
}
