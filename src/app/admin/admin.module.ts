import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { OrdersComponent } from './orders/orders.component';
import {ProductsService} from './abstract-products-service';
import {ProductsFirebaseService} from './products-firebase.service';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {HttpClientModule} from '@angular/common/http';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { NoNegativeDirective } from './no-negative.directive';

const routes: Routes = [
  {path: 'admin/products/edit/:id', component: EditProductComponent},
  {path: 'admin/products/add', component: AddProductComponent},
  {path: 'admin/products', component: ProductsComponent}
];

@NgModule({
  declarations: [ProductsComponent, OrdersComponent, EditProductComponent, AddProductComponent, NoNegativeDirective],
  imports: [
    CommonModule,
    AngularFirestoreModule,
    HttpClientModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    FormsModule,
    RouterModule.forRoot(routes),
    MatButtonModule,
    MatSelectModule,
    MatAutocompleteModule,
    ReactiveFormsModule
  ],
  exports: [ProductsComponent, OrdersComponent],
  providers: [
    {provide: ProductsService, useClass: ProductsFirebaseService}
  ]
})
export class AdminModule { }
