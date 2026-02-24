import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavbarComponent, FooterComponent],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css'
})
export class SignupPageComponent implements OnInit {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';
  signupError = '';

  signup() {
    if (!this.name || !this.email || !this.password) {
      this.signupError = 'Please fill in all required fields.';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.signupError = 'Passwords do not match.';
      return;
    }
    this.signupError = '';
    alert('Signup successful (mock).');
  }

  ngOnInit(): void {
    try { window.scrollTo({ top: 0, left: 0 }); } catch { window.scrollTo(0, 0); }
  }
}
