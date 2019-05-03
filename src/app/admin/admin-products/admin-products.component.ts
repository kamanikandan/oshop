import { Product } from './../../models/product';
import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  products: Product[];
  filteredProducts: any[];
  rowsOnPage: number;
  constructor(private productService: ProductService) {
    this.subscription = productService.getAll()
    .subscribe(p => {
      debugger;
      this.filteredProducts = this.products = p;
      this.rowsOnPage = this.filteredProducts.length;
    });
  }

  filterProducts(query: string) {
    this.filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
      this.rowsOnPage = this.filteredProducts.length;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
  }

}
