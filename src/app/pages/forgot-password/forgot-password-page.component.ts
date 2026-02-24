import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { Authservice } from '../../services/authservice';

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
  isLoading = false;
  sent = false;
  private authService = inject(Authservice);

  sendReset() {
    if (!this.email) {
      this.message = 'Please enter your email.';
      return;
    }

    this.message = '';
    this.isLoading = true;
    this.authService.authSentEmail(this.email)
      .then((errMsg) => {
        if (errMsg) {
          this.message = errMsg;
        } else {
          this.sent = true;
          this.message = 'Password reset link sent to your email.';
        }
      })
      .catch(() => {
        this.message = 'Unexpected error while sending reset email.';
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  ngOnInit(): void {
    try { window.scrollTo({ top: 0, left: 0 }); } catch { window.scrollTo(0, 0); }
  }
}
