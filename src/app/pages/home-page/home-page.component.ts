import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { FeaturesComponent } from '../../components/features/features.component';
import { PricingComponent } from '../../components/pricing/pricing.component';
import { ContactComponent } from '../../components/contact/contact.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    FeaturesComponent,
    PricingComponent,
    ContactComponent,
    FooterComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    // Scroll to fragment when it appears in the route (handles navigation from other pages)
    this.route.fragment.subscribe((frag) => {
      if (frag) {
        // small timeout to allow view to settle
        setTimeout(() => this.scrollToSection(frag), 50);
      }
    });

    // Also handle cases where navigation happens to the same component with a fragment
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      const frag = this.route.snapshot.fragment;
      if (frag) {
        setTimeout(() => this.scrollToSection(frag), 50);
      }
    });
  }
  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
  onLogin() {
    window.location.href = '/login';
  }
}

