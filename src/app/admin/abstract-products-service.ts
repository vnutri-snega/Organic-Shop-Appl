import {Observable} from 'rxjs';

export class Product {
  id: string;
  title: string;
  price: number;
  category: string;
  imageUrl: string;

  constructor(id: string, title: string, price: number, category: string, imageUrl: string) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.category = category;
    this.imageUrl = imageUrl;
  }
}

export abstract class ProductsService {
  abstract addProduct(product: Product): Promise<void>;
  abstract getProduct(id: string): Observable<Product>;
  abstract getProducts(category?: string): Observable<Product[]>;
  abstract deleteProduct(id: string): Promise<void>;
  abstract updateProduct(product: Product): Promise<void>;
}
