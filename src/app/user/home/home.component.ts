import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Product, ProductsService} from '../../admin/abstract-products-service';
import { HostListener } from '@angular/core';
import {CategoriesService, Category} from '../../admin/categories.service';
import {MatSelectionListChange} from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products$: Observable<Product[]>;
  categories$: Observable<Category[]>;
  screenWidth: any;
  colsNum: number;
  rowHeight: string;

  constructor(private categoriesService: CategoriesService,
              private productsService: ProductsService) {
    this.onResize();
  }

  ngOnInit() {
    this.products$ = this.productsService.getProducts();
    this.categories$ = this.categoriesService.getCategories();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth < 660) {
      this.colsNum = 1;
      this.rowHeight = '2:1';
    } else if (this.screenWidth < 930) {
      this.colsNum = 2;
      this.rowHeight = '1:1';
    } else if (this.screenWidth < 1300) {
      this.colsNum = 3;
      this.rowHeight = '5:6';
    } else {
      this.colsNum = 4;
      this.rowHeight = '3:4';
    }
  }

  selection(change: MatSelectionListChange) {
    const selected = change.option.selected;
    change.source.deselectAll();
    change.option.selected = selected;
    this.products$ = this.productsService.getProducts(!selected ? '' : change.option.value as string);
  }
}
