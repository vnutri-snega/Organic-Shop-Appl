import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {CartService} from '../cart.service';

@Component({
  selector: 'app-cart-tweet',
  templateUrl: './cart-tweet.component.html',
  styleUrls: ['./cart-tweet.component.css']
})
export class CartTweetComponent implements OnInit {
  icon = 'shopping_cart';
  quantity = 0;

  constructor(private cartService: CartService) {
  }

  ngOnInit() {
    this.cartService.getProductCarts().forEach(pc => {
      this.quantity = 0;
      pc.forEach(p => {
        this.quantity = this.quantity + 1;
      });
    });
  }

}
