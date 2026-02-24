import { Component, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'tuneit';
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
  private router = inject(Router);

  constructor() {
    const root = () => document.querySelector('app-root') as HTMLElement | null;
    this.router.events.subscribe((event) => {
      const el = root();
      if (!el) return;
      if (event instanceof NavigationStart) {
        el.classList.remove('route-enter');
        el.classList.add('route-exit');
      }
      if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        el.classList.remove('route-exit');
        el.classList.add('route-enter');
        // remove enter class after animation
        window.setTimeout(() => el.classList.remove('route-enter'), 400);
      }
    });
  }
}
