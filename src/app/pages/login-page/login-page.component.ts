import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, FooterComponent, RouterModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit {
  username = '';
  password = '';
  hidePassword = true;
  loginError = '';

  login() {
    // Placeholder for authentication logic
    if (this.username === 'admin' && this.password === 'password') {
      this.loginError = '';
      // Redirect or show success
      alert('Login successful!');
    } else {
      this.loginError = 'Invalid username or password.';
    }
  }

  ngOnInit(): void {
    try { window.scrollTo({ top: 0, left: 0 }); } catch { window.scrollTo(0, 0); }
  }
}
