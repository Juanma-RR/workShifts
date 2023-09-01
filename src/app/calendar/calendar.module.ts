import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { CalendarRoutingModule } from './calendar-routing.module'
import { ColorPaletteModule } from '../shared/color-palette/color-palette.module'
import { ModalModule } from '../shared/modal/modal.module'

import { CalendarPageComponent } from './pages/calendar-page/calendar-page.component'
import { DiaryPageComponent } from './pages/diary-page/diary-page.component'
import { ShiftsPageComponent } from './pages/shifts-page/shifts-page.component'

@NgModule({
  declarations: [
    CalendarPageComponent,
    DiaryPageComponent,
    ShiftsPageComponent
  ],
  imports: [
    CalendarRoutingModule,
    ColorPaletteModule,
    CommonModule,
    FormsModule,
    ModalModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [CalendarPageComponent]
})
export class CustomCalendarModule {}
