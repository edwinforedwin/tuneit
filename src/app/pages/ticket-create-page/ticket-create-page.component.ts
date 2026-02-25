import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface TicketForm {
  title: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string; // ISO date
  assignee: string;
}

@Component({
  selector: 'app-ticket-create-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ticket-create-page.component.html',
  styleUrl: './ticket-create-page.component.css'
})
export class TicketCreatePageComponent {
  form: TicketForm = {
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: '',
    assignee: ''
  };

  createdTickets: TicketForm[] = [];

  submit() {
    // basic client-side creation — replace with API call later
    const ticket = { ...this.form };
    if (!ticket.title) return;
    this.createdTickets.unshift(ticket);
    // reset form
    this.form = { title: '', description: '', priority: 'Medium', dueDate: '', assignee: '' };
  }
}
