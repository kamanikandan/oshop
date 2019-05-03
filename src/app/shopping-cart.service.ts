import { ShoppingCart } from './models/shopping-cart';
import { Product } from './models/product';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ShoppingCartService {
	constructor(private db: AngularFireDatabase) {}

	async getCart(): Promise<Observable<ShoppingCart>> {
		let cartId = await this.getorcreateCartId();
		return this.db.object('/shopping-carts/' + cartId)
		.map(x =>  new ShoppingCart(x.items));
	}

	async addToCart(product: Product) {
		this.updateItem(product, 1);
	}
	async removeFromCart(product: Product) {
		this.updateItem(product, -1);
	}

	async clearCart() {
		let cartId = await this.getorcreateCartId();
		return this.db.object('/shopping-carts/' + cartId + '/items').remove();
	}

	private create() {
		return this.db.list('/shopping-carts').push({
			dateCreated: new Date().getTime()
		});
	}

	private getCartItem(cartId: string, productId: string) {
		return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
	}

	private async getorcreateCartId(): Promise<string> {
		let cartId = localStorage.getItem('cartId');
		if (cartId) return cartId;

		let result = await this.create();
		localStorage.setItem('cartId', result.key);
		return result.key;
	}

	private async updateItem(product: Product, change: number) {
		let cartId = await this.getorcreateCartId();
		let item$ = this.getCartItem(cartId, product.$key);
		item$.take(1).subscribe((item) => {
			let quantity = (item.quantity || 0) + change;
			if(quantity === 0) item$.remove();
			else item$.update({ 
				title: product.title,
				imageUrl: product.imageUrl,
				price: product.price,
				quantity: quantity
			});
		});
	}
}
