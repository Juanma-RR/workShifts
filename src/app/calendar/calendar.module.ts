import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarRoutingModule } from './calendar-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import { CalendarPageComponent } from './pages/calendar-page/calendar-page.component';
import { DiaryPageComponent } from './pages/diary-page/diary-page.component';
import { ShiftsPageComponent } from './pages/shifts-page/shifts-page.component';



@NgModule({
  declarations: [
    CalendarPageComponent,
    DiaryPageComponent,
    ShiftsPageComponent
  ],
  imports: [
    CommonModule,
    CalendarRoutingModule,
    FormsModule,
    RouterModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  exports:[CalendarPageComponent]
})
export class CustomCalendarModule {}
