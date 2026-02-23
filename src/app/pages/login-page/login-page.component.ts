import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
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
}
