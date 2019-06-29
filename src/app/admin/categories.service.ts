import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AngularFirestore} from '@angular/fire/firestore';
import {Product} from './abstract-products-service';
import {Observable} from 'rxjs';
const CATEGORIES = 'categories';

export interface Category {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private httpClient: HttpClient,
              private firestore: AngularFirestore) {
      this.getCategories().subscribe(data => {
      if (!data || data.length === 0) {
        this.createCategories();
      }
    });
  }

  public getCategories(): Observable<Category[]> {
    return this.firestore.collection<Category>(CATEGORIES).valueChanges();
  }

  private createCategories() {
    this.httpClient.get<any[]>('assets/categories.json')
      .subscribe(data => {
      data.forEach((c) => {
        for (const key of Object.keys(c)) {
          const category: Category = {id: key, name: c[key].name};
          this.firestore.collection<Category>(CATEGORIES).doc(key).set(category);
        }
      });
    });
  }
}
