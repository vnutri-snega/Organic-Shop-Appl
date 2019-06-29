import { Component, OnInit } from '@angular/core';
import {CategoriesService, Category} from '../categories.service';
import {Product, ProductsService} from '../abstract-products-service';
import {FormControl, NgForm, NgModel} from '@angular/forms';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';

const MIN = 10000;
const MAX = 99999;

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  product: Product = {price: 0, title: '', category: '', imageUrl: '', id: ''};
  categories$: Observable<Category[]>;

  constructor(private categoriesService: CategoriesService,
              private productService: ProductsService,
              private router: Router) {
  }

  ngOnInit() {
    this.categories$ = this.categoriesService.getCategories();
  }

  save() {
    this.product.id = Math.floor(Math.random() * (MAX - MIN + 1) + MIN) + '';
    this.productService.addProduct(this.product).then(
      () => this.router.navigate(['/admin/products']));
  }


  cancel() {
    this.router.navigate(['/admin/products']).then();
  }
}
