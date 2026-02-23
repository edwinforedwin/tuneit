import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './features.component.html',
  styleUrl: './features.component.css'
})
export class FeaturesComponent {
  features: Feature[] = [
    {
      icon: '📋',
      title: 'Task Management',
      description: 'Create, assign, and track tickets with ease. Organize tasks by priority, status, and team members.'
    },
    {
      icon: '👥',
      title: 'Team Collaboration',
      description: 'Work together seamlessly with real-time updates, comments, and file sharing capabilities.'
    },
    {
      icon: '📊',
      title: 'Advanced Analytics',
      description: 'Get insights into your team performance with detailed reports and progress tracking.'
    },
    {
      icon: '⏰',
      title: 'Time Tracking',
      description: 'Monitor time spent on tasks and generate detailed time reports for billing and analysis.'
    },
    {
      icon: '🔔',
      title: 'Smart Notifications',
      description: 'Stay updated with intelligent notifications for important changes and deadlines.'
    },
    {
      icon: '🔐',
      title: 'Enterprise Security',
      description: 'Bank-level security with encryption, role-based access control, and audit logs.'
    }
  ];
}
