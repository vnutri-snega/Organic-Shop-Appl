import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Product, ProductsService} from '../abstract-products-service';
import {CategoriesService} from '../categories.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  dataSource: MatTableDataSource<Product>;
  displayedColumns = ['title', 'category', 'price', 'edit', 'delete'];

  constructor(private productsService: ProductsService,
              private categoriesService: CategoriesService,
              private router: Router) { }

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.productsService.getProducts().subscribe(products => {
      this.dataSource = new MatTableDataSource<Product>(products);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  remove(id: string) {
    this.productsService.deleteProduct(id)
      .then(() => this.ngOnInit());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addProduct() {
    this.router.navigate(['/admin/products/add']).then();
  }
}
