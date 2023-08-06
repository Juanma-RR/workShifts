import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CalendarPageComponent } from './pages/calendar-page/calendar-page.component';
import { DiaryPageComponent } from './pages/diary-page/diary-page.component';
import { ShiftsPageComponent } from './pages/shifts-page/shifts-page.component';


const routes: Routes = [
  {
    path: '',
    component: CalendarPageComponent,
  },
  {
    path: 'diary',
    component: DiaryPageComponent,
  },
  {
    path: 'shifts',
    component: ShiftsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalendarRoutingModule {}
