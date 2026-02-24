import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { Authservice } from '../../services/authservice';

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
  isLoading = false;
  private loginService = inject(Authservice);

  login() {
    if (this.username === '' || this.password === '') {
      this.loginError = 'Please input username and password';
    } else {
      this.isLoading = true;
      this.loginService.authLogin(this.username, this.password)
        .then((errMsg) => {
          this.loginError = errMsg ?? '';
        })
        .catch(() => {
          this.loginError = 'Unexpected error during login';
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }

  ngOnInit(): void {
    try { window.scrollTo({ top: 0, left: 0 }); } catch { window.scrollTo(0, 0); }
  }
}
