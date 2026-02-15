import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-email-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './email-admin.component.html',
  styleUrls: ['./email-admin.component.css']
})
export class EmailAdminComponent {
  emailSubject: string = '';
  emailBody: string = '';
  sendSuccess: boolean | null = null;

  constructor() { }

  sendNewsletter(): void {
    console.log('Sending newsletter (mock):');
    console.log('Subject:', this.emailSubject);
    console.log('Body:', this.emailBody);
    this.sendSuccess = true;
    alert('Newsletter sent successfully (mock)!');
  }
}
