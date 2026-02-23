import { Component, Output, EventEmitter, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private router = inject(Router);

  @Output() scrollTo = new EventEmitter<string>();

  navigate(sectionId: string) {
    this.scrollTo.emit(sectionId);
  }

  login() {
    this.router.navigate(['/login']);
  }
}
