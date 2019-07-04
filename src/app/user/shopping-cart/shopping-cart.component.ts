import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CartService, ProductCart} from '../cart.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Subscription} from 'rxjs';
import {AuthService} from '../../shared/auth-service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  dataSource: MatTableDataSource<ProductCart>;
  displayedColumns = ['title', 'price', 'amount', 'total_price', 'delete'];
  productAmount = 0;
  pages = [4, 6, 8, 10, 12];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private cartService: CartService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.cartService.getProductCarts()
      .subscribe(productCarts => {
        this.dataSource = new MatTableDataSource<ProductCart>(productCarts);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.productAmount = this.dataSource.data.length;
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  remove(pc: ProductCart) {
    this.cartService.removeProductCart(pc.productId)
      .then(() => this.ngOnInit());
  }

  total_price(product: ProductCart) {
    return product.quantity * product.price;
  }

  substractQuantity(pc: ProductCart) {
    if (pc.quantity === 1) {
      this.cartService.removeProductCart(pc.productId)
        .then(() => {
          pc.quantity = 0;
        });
    } else {
      this.cartService.updateQuantity(pc, pc.quantity - 1)
        .then(() => {
          --pc.quantity;
          this.ngOnInit();
        });
    }
  }

  addQuantity(pc: ProductCart) {
    this.cartService.updateQuantity(pc, pc.quantity + 1).then(() => this.ngOnInit());
  }

  getTotalAmount() {
    let totalAmount = 0;
    if (this.dataSource) {
      this.dataSource.data.forEach(p => {
        totalAmount = totalAmount + p.quantity;
      });
    }
    return totalAmount;
  }

  getTotalCost() {
    let totalCost = 0;
    if (this.dataSource) {
      this.dataSource.data.forEach(p => {
        totalCost = totalCost + this.total_price(p);
      });
    }
    return totalCost;
  }

  takeFirstSize() {
    let size = this.pages[0];
    for (let i = 0; i < this.pages.length; i++) {
      if (this.productAmount < this.pages[i]) {
        size = this.pages[i];
        break;
      }
    }
    if (this.productAmount > size) {
      size = this.pages[this.pages.length - 1];
    }
    return size;
  }

  createOrder() {
    if (!this.authService.isAuth()) {
      this.router.navigate(['/login']).then();
    } else {
      this.router.navigate(['/user/order']).then();
    }
  }
}
