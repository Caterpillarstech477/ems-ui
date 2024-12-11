import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'employee-management-system';
  showSidebar: boolean = false;

  constructor(private router: Router) {
    // Listen for route changes and check if the current route is login page
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // If the route is login page, don't show the sidebar
      this.showSidebar = this.router.url !== '/';
    });
  }
}
