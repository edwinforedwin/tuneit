import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private router = inject(Router);

  @Output() scrollTo = new EventEmitter<string>();

  navigate(sectionId: string) {
    // If already on the home route, emit event so parent can scroll.
    // Otherwise navigate to home with fragment so HomePage handles scrolling.
    const current = this.router.url.split('#')[0];
    if (current === '/' || current === '/home') {
      this.scrollTo.emit(sectionId);
    } else {
      this.router.navigate([''], { fragment: sectionId });
    }
  }

  login() {
    this.router.navigate(['/login']);
  }

  goHome() {
    // navigate to home, clear any fragment, replace the history entry
    // then force-scroll to top so we don't preserve previous scroll position
    this.router.navigate([''], { fragment: undefined, replaceUrl: true }).then(() => {
      try {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      } catch (e) {
        window.scrollTo(0, 0);
      }
    });
  }
}
