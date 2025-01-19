import { Component, OnInit } from '@angular/core';
import { NavbarItemComponent } from "../../navbar-item/navbar-item.component";
import { NavItem } from "../../../interfaces/navbar.interface";
import { NAV_ITEMS } from "../../../constants/navigation.constants";
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { NgClass } from "@angular/common";

@Component({
  selector: 'app-header',
  templateUrl: `header.component.html`,
  standalone: true,
  imports: [
    NavbarItemComponent,
    NgClass,
  ],
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userInitial: string | null = null;
  navItems: NavItem[] = NAV_ITEMS;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.userInitial = user ? user.charAt(0).toUpperCase() : null;
    });
  }

  navigateToLogin() {
    this.router.navigate(['/login']).catch(error => {
      console.error('Navigation error to login:', error);
    });
  }

  navigateToTest() {
    this.router.navigate(['/test']).catch(error => {
      console.error('Navigation error to test:', error);
    });
  }

}
