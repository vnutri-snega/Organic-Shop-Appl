import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { OrdersComponent } from './orders/orders.component';
import {_MatMenuDirectivesModule, MatButtonModule, MatCardModule, MatGridListModule, MatListModule, MatMenuModule} from '@angular/material';

@NgModule({
  declarations: [HomeComponent, ShoppingCartComponent, OrdersComponent],
  imports: [
    CommonModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    _MatMenuDirectivesModule,
    MatMenuModule
  ],
  exports: [HomeComponent, ShoppingCartComponent, OrdersComponent]
})
export class UserModule { }
