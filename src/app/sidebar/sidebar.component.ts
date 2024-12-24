import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private router: Router) {}
  
  activeDropdown: string | null = null;
  
 


toggleDropdown(dropdown: string): void {
  this.activeDropdown = this.activeDropdown === dropdown ? null : dropdown;
}
logout() {
  // Clear user session data (e.g., tokens)
  localStorage.clear();
  sessionStorage.clear();

  // Navigate to the login page
  this.router.navigate(['/login']);
}

}
