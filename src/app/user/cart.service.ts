import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Product} from '../admin/abstract-products-service';
export class CartConfig {
  static readonly CART_ID = 'cartId';
  static readonly CART_COLLECTION = 'carts';
  static CART_PRODUCTS = 'cart_products';
}
export interface Cart {
  timestamp: number;
}

export interface ProductCart {
  cartId: string;
  productId: string;
  quantity: number;
  price: number;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartId: string;

  constructor(private firestore: AngularFirestore) {
    if (!localStorage.getItem(CartConfig.CART_ID)) {
      const cart: Cart = {timestamp: new Date().getTime()};
      firestore.collection<Cart>(CartConfig.CART_COLLECTION).add(cart)
        .then(d => {
          this.cartId = d.id;
          localStorage.setItem(CartConfig.CART_ID, this.cartId);
        });
    } else {
      this.cartId = localStorage.getItem(CartConfig.CART_ID);
    }
  }

  createProductCart(product: Product): Promise<void> {
    return this.updateProductCart(product, 1);
  }

  updateProductCart(product: Product, quantity: number): Promise<void>  {
    const id = this.cartId + product.id;
    const productCart: ProductCart = {quantity, cartId: this.cartId, productId: id,
      price: product.price, title: product.title};
    return this.firestore.collection<ProductCart>(CartConfig.CART_PRODUCTS)
      .doc(id).set(productCart);
  }

  removeProductCart(id: string): Promise<void> {
    return this.firestore.collection(CartConfig.CART_PRODUCTS).doc(id).delete();
  }

  getProductCart(productId: string): Observable<ProductCart> {
    return this.firestore.collection<ProductCart>(CartConfig.CART_PRODUCTS)
      .doc(this.cartId + productId).get()
      .pipe(map(d => d.data() as ProductCart));
  }

  getProductCarts(): Observable<ProductCart[]> {
    return this.firestore.collection<ProductCart>(CartConfig.CART_PRODUCTS, ref => {
      return ref.where('cartId', '==', this.cartId);
    }).valueChanges();
  }

  updateQuantity(pc: ProductCart, newQuantity: number) {
      const productCart: ProductCart = {
        quantity: newQuantity, productId: pc.productId, cartId: pc.cartId,
        price: pc.price, title: pc.title
      };
      return this.firestore.collection<ProductCart>(CartConfig.CART_PRODUCTS).doc(pc.productId).set(productCart);
  }
}
