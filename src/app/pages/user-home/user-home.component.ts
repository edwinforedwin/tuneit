import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent {
  private router = inject(Router);
  // start with the sidebar collapsed by default
  collapsed = true;

  toggle() {
    this.collapsed = !this.collapsed;
    // small timeout to allow CSS transition
    setTimeout(() => {
      const ev = new Event('resize');
      window.dispatchEvent(ev);
    }, 250);
  }

  navigateTo(path: string) {
    this.router.navigate([`/user/${path}`]);
  }

  logout() {
    // simple client-side logout placeholder — adapt to real auth
    this.router.navigate(['/login']);
  }
}
