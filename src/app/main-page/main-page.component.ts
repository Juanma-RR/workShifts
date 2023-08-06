import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent {
  constructor(private router: Router) {}

  goCalendar() {
    this.router.navigateByUrl('calendar');
  }

  goDiary() {
    this.router.navigateByUrl('calendar/diary');
  }

  goShift() {
    this.router.navigateByUrl('calendar/shifts');
  }
}
