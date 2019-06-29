import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OshopNavComponent} from './oshop-nav/oshop-nav.component';
import {LogoutComponent} from './logout/logout.component';
import {UserModule} from '../user/user.module';
import {AdminModule} from '../admin/admin.module';
import {RouterModule, Routes} from '@angular/router';
import {OrdersComponent as AdminOrders} from '../admin/orders/orders.component';
import {ProductsComponent} from '../admin/products/products.component';
import {OrdersComponent as UserOrders} from '../user/orders/orders.component';
import {ShoppingCartComponent} from '../user/shopping-cart/shopping-cart.component';
import {HomeComponent} from '../user/home/home.component';
import {MatButtonModule, MatIconModule, MatMenuModule, MatTabsModule} from '@angular/material';
import {LoginComponent} from './login/login.component';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AuthService} from './auth-service';
import {AuthFirebaseService} from './auth-firebase.service';
import {AdminGuard, AuthGuard} from './auth-guard';

const routes: Routes = [
  {path: 'admin/orders', component: AdminOrders, canActivate: [AdminGuard]},
  {path: 'admin/products', component: ProductsComponent, canActivate: [AdminGuard]},
  {path: 'user/orders', component: UserOrders, canActivate: [AuthGuard]},
  {path: 'user/shopping-cart', component: ShoppingCartComponent},
  {path: 'user/home', component: HomeComponent},
  {path: 'logout', component: LogoutComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: 'user/home', pathMatch: 'full' }
];

@NgModule({
  declarations: [OshopNavComponent, LogoutComponent, LoginComponent],
  imports: [
    CommonModule,
    UserModule,
    AdminModule,
    RouterModule.forRoot(routes),
    MatTabsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  exports: [OshopNavComponent],
  providers: [
    {provide: AuthService, useClass: AuthFirebaseService}
  ]
})
export class SharedModule { }
