import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GanttComponent } from '../../components/gantt/gantt.component';

interface Ticket {
  id: string;
  title: string;
  start: string; // ISO date
  end: string; // ISO date
  color?: string;
}

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, GanttComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent implements OnInit {
  tickets: Ticket[] = [];

  ngOnInit(): void {
    // sample tickets — replace with API fetch later
    this.tickets = [
      { id: 'TCK-001', title: 'Design landing hero', start: '2026-02-20', end: '2026-02-25', color: '#06b6d4' },
      { id: 'TCK-002', title: 'Build auth flow', start: '2026-02-24', end: '2026-03-05', color: '#0ea5e9' },
      { id: 'TCK-003', title: 'Integrate payments', start: '2026-03-01', end: '2026-03-12', color: '#7c3aed' },
      { id: 'TCK-004', title: 'QA & polish', start: '2026-02-26', end: '2026-03-10', color: '#10b981' }
    ];
  }
}
