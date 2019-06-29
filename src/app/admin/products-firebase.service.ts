import { Injectable } from '@angular/core';
import {Product, ProductsService} from './abstract-products-service';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
const PRODUCTS = 'products';

@Injectable({providedIn: 'root'})
export class ProductsFirebaseService implements ProductsService {

  constructor(private httpClient: HttpClient,
              private firestore: AngularFirestore) {
    firestore.collection<Product>(PRODUCTS)
      .valueChanges().subscribe(data => {
        if (!data || data.length === 0) {
          this.createProducts();
        }
    });
  }

  addProduct(product: Product): Promise<void> {
    return this.addUpdate(product);
  }

  deleteProduct(id: string): Promise<void> {
    return this.firestore.collection(PRODUCTS).doc(id).delete();
  }

  getProduct(id: string): Observable<Product> {
    return this.firestore.collection<Product>(PRODUCTS).doc(id).get()
      .pipe(map(p => p.data() as Product)) ;
  }

  getProducts(category?: string): Observable<Product[]> {
    if (!category) {
      return this.firestore.collection<Product>(PRODUCTS).valueChanges();
    }
    return this.firestore.collection<Product>(PRODUCTS, ref => {
      return ref.where('category', '==', category);
    }).valueChanges();
  }

  updateProduct(product: Product): Promise<void> {
    return this.addUpdate(product);
  }

  private createProducts() {
    this.httpClient.get<Product[]>('assets/products.json').subscribe(data => {
      data.forEach((product, index) => {
        product.id = '' + (index + 1);
        this.addUpdate(product);
      });
    });
  }

  private addUpdate(product: Product) {
    return this.firestore.collection<Product>(PRODUCTS)
      .doc(product.id).set(product);
  }
}
