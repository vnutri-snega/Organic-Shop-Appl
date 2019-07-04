import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import {OrdersComponent as UserOrders, OrdersComponent} from './orders/orders.component';
import {
  _MatMenuDirectivesModule, MatBadgeModule,
  MatButtonModule,
  MatCardModule, MatFormFieldModule,
  MatGridListModule,
  MatIconModule, MatInputModule,
  MatListModule,
  MatMenuModule, MatPaginatorModule, MatSortModule, MatTableModule
} from '@angular/material';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { ProductCartComponent } from './product-cart/product-cart.component';
import { CartTweetComponent } from './cart-tweet/cart-tweet.component';
import {RouterModule, Routes} from '@angular/router';
import { AddOrderComponent } from './add-order/add-order.component';
import {OrdersComponent as AdminOrders} from '../admin/orders/orders.component';
import {AdminGuard, AuthGuard} from '../shared/auth-guard';
import {ProductsComponent} from '../admin/products/products.component';
import {LogoutComponent} from '../shared/logout/logout.component';
import {LoginComponent} from '../shared/login/login.component';

const routes: Routes = [
  {path: 'user/order', component: AddOrderComponent},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: 'user/home', pathMatch: 'full' }
];

@NgModule({
  declarations: [HomeComponent, ShoppingCartComponent, OrdersComponent, ProductCartComponent, CartTweetComponent, AddOrderComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    _MatMenuDirectivesModule,
    MatMenuModule,
    AngularFirestoreModule,
    MatIconModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    RouterModule.forRoot(routes),
    MatPaginatorModule,
    MatBadgeModule
  ],
  exports: [HomeComponent, ShoppingCartComponent, OrdersComponent, CartTweetComponent]
})
export class UserModule { }
