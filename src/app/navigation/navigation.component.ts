import { Component, OnInit } from '@angular/core';

import { NavigationService } from '../services/navigation.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  providers: [NavigationService]
})
export class NavigationComponent implements OnInit {

  navItems = [] = [];

  constructor(private _navServices: NavigationService) { }

  ngOnInit() {
    this.navItems = this._navServices.getNavItems();
  }

}
