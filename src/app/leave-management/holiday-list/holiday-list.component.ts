import { Component } from '@angular/core';

@Component({
  selector: 'app-holiday-list',
  templateUrl: './holiday-list.component.html',
  styleUrls: ['./holiday-list.component.css']
})
export class HolidayListComponent {
  holidays = [
    { name: 'Christmas', date: '25-12-2024', day: 'Tuesday', type: 'Public', region: 24 },
    { name: 'New Year', date: '01-01-2024', day: 'Friday', type: 'Public', region: 16 },
    { name: 'Pongal', date: '13-03-2024', day: 'Tuesday', type: 'Public', region: 18 },
    { name: 'Sankranthi', date: '25-04-2024', day: 'Friday', type: 'Public', region: 10 },
    { name: 'Republic Day', date: '25-05-2024', day: 'Saturday', type: 'Public', region: 16 },
    { name: 'Good Friday', date: '03-06-2024', day: 'Wednesday', type: 'Public', region: 18 },
    { name: 'Labour Day', date: '01-05-2024', day: 'Tuesday', type: 'Public', region: 13 },
    { name: 'Thanks Giving Day', date: '25-11-2024', day: 'Friday', type: 'Public', region: 11 },
    { name: 'Independence Day', date: '15-08-2024', day: 'Saturday', type: 'Public', region: 8 },
    { name: 'Gandhi Jayanti', date: '02-08-2024', day: 'Sunday', type: 'Public', region: 9 },
    { name: 'Diwali', date: '10-11-2024', day: 'Tuesday', type: 'Public', region: 10 },
    { name: 'Ganesh Chaturthi', date: '09-12-2024', day: 'Monday', type: 'Public', region: 14 },
    { name: 'Company Anniversary', date: '11-03-2024', day: 'Tuesday', type: 'Public', region: 17 },
    { name: 'Festival', date: '30-12-2024', day: 'Monday', type: 'Public', region: 19 },
  ];

  onView(holiday: any) {
    console.log('View Holiday:', holiday);
  }

  onEdit(holiday: any) {
    console.log('Edit Holiday:', holiday);
  }

  onDelete(holiday: any) {
    console.log('Delete Holiday:', holiday);
  }

}
