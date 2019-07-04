import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CartService} from '../cart.service';
import {Product} from '../../admin/abstract-products-service';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit {
  quantity: number;
  @Input() product: Product;
  @Output() action = new EventEmitter();

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.getProductCart(this.product.id)
      .subscribe(pc => {
        this.quantity = pc ? pc.quantity : 0;
      });
  }

  substractQuantity() {
    if (this.quantity === 1) {
      this.cartService.removeProductCart(this.cartService.cartId + this.product.id)
        .then(() => {
          this.quantity = 0;
        });
    } else {
      this.cartService.updateProductCart(this.product, this.quantity - 1)
        .then(() => --this.quantity);
    }
  }

  addQuantity() {
    this.cartService.updateProductCart(this.product, this.quantity + 1)
      .then(() => ++this.quantity);
  }

  addProduct() {
    this.cartService.createProductCart(this.product)
      .then(() => this.quantity = 1);
  }
}
