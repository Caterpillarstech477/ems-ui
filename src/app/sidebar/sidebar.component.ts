import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  //dropdownOpen = false;
  activeDropdown: string | null = null;

//   toggleDropdown() {
//     this.dropdownOpen = !this.dropdownOpen;
// }
toggleDropdown(dropdown: string): void {
  this.activeDropdown = this.activeDropdown === dropdown ? null : dropdown;
}
}
