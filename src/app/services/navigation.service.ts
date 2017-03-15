import { Injectable } from '@angular/core';

@Injectable()
export class NavigationService {

  private navItems = [
    {
      name: 'Home',
      url: ''
    },
    {
      name: 'About',
      url: '/about'
    },
    {
      name: 'Blog',
      url: '/blog'
    },
    {
      name: 'Contact',
      url: '/contact'
    }
  ];

  constructor() { }

  getNavItems() {
    return this.navItems;
  }

}
