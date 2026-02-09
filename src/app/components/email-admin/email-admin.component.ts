import { Component } from '@angular/core';

@Component({
  selector: 'app-email-admin',
  templateUrl: './email-admin.component.html',
  styleUrls: ['./email-admin.component.css']
})
export class EmailAdminComponent {
  emailSubject: string = '';
  emailBody: string = '';
  sendSuccess: boolean | null = null;

  constructor() { }

  sendNewsletter(): void {
    // In a real application, this would involve an API call to a backend service
    // that handles sending mass emails.
    console.log('Sending newsletter:');
    console.log('Subject:', this.emailSubject);
    console.log('Body:', this.emailBody);

    // Simulate API call success/failure
    this.sendSuccess = Math.random() > 0.2; // 80% chance of success for demo

    if (this.sendSuccess) {
      alert('Newsletter sent successfully (mock)! Check console for details.');
      this.emailSubject = '';
      this.emailBody = '';
    } else {
      alert('Failed to send newsletter (mock). Please try again.');
    }
  }
}
