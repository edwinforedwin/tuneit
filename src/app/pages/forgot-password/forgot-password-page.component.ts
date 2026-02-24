import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password-page',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NavbarComponent, FooterComponent],
  templateUrl: './forgot-password-page.component.html',
  styleUrl: './forgot-password-page.component.css'
})
export class ForgotPasswordPageComponent implements OnInit {
  email = '';
  message = '';

  sendReset() {
    if (!this.email) {
      this.message = 'Please enter your email.';
      return;
    }
    this.message = '';
    alert('Password reset link sent (mock).');
  }

  ngOnInit(): void {
    try { window.scrollTo({ top: 0, left: 0 }); } catch { window.scrollTo(0, 0); }
  }
}
