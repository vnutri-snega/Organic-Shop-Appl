import { Component, OnInit } from '@angular/core';
import {Product, ProductsService} from '../abstract-products-service';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  product$: Observable<Product>;

  constructor(private productsService: ProductsService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.product$ = this.productsService.getProduct(id);
  }

  update(form: NgForm) {
    this.productsService.updateProduct(form.value).then(() => this.onCancel());
  }

  onCancel() {
    this.router.navigate(['/admin/products']);
  }
}
