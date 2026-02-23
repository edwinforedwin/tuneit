import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  submitted = false;
  successMessage = '';

  onSubmit() {
    if (this.formData.name && this.formData.email && this.formData.message) {
      this.submitted = true;
      this.successMessage = 'Thank you! We will get back to you soon.';
      
      // Reset form after 3 seconds
      setTimeout(() => {
        this.formData = { name: '', email: '', subject: '', message: '' };
        this.submitted = false;
        this.successMessage = '';
      }, 3000);
    }
  }

  contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      value: 'support@tuneit.com'
    },
    {
      icon: '📞',
      title: 'Phone',
      value: '+1 (800) 123-4567'
    },
    {
      icon: '📍',
      title: 'Address',
      value: '123 Tech Street, San Francisco, CA 94105'
    }
  ];
}
