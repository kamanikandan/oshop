import { ShoppingCartService } from './../shopping-cart.service';
import { AppUser } from './../models/app.user';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'bs-navbar',
	templateUrl: './bs-navbar.component.html',
	styleUrls: [ './bs-navbar.component.css' ]
})
export class BsNavbarComponent implements OnInit {
	user: AppUser;
	cart$;
	constructor(public auth: AuthService, private cartService: ShoppingCartService) {}

	async ngOnInit() {
		this.auth.appUser$.subscribe((user) => (this.user = user));
		this.cart$ = await this.cartService.getCart();
	}

	logout() {
		this.auth.logout();
	}
}
