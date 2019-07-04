import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../auth-service';
import {CartService} from '../../user/cart.service';

interface Link {
  label: string;
  path: string;
}

@Component({
  selector: 'app-oshop-nav',
  templateUrl: './oshop-nav.component.html',
  styleUrls: ['./oshop-nav.component.css']
})
export class OshopNavComponent implements OnInit {

  navLinks: Link[] = [
    {path: 'user/home', label: 'Home'},
    {path: 'user/shopping-cart', label: 'Shopping Cart'}
  ];

  loginLink: Link = {path: 'login', label: 'Login'};

  adminMenuItems: Link[] = [
    {path: 'user/orders', label: 'My orders'},
    {path: 'admin/orders', label: 'Manage orders'},
    {path: 'admin/products', label: 'Manage products'},
    {path: 'logout', label: 'LogOut'}
  ];

  userMenuItems: Link[] = [
    {path: 'user/orders', label: 'My orders'},
    {path: 'logout', label: 'LogOut'}
  ];

  constructor(private authService: AuthService,
              private cartService: CartService) { }

  isAuth(): boolean {
    return this.authService.isAuth();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  getUserName() {
    if (!this.isAuth()) {
      return 'anonymous';
    }
    return this.authService.getUSer().displayName;
  }

  ngOnInit() {

  }

}
