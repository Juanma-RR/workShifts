import { Component } from '@angular/core';
import { isToday } from 'date-fns';

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.css'],
})
export class CalendarPageComponent {
  public days: string[];
  public months: string[];
  public monthDayBlocks: {
    value: number;
    disabled: boolean;
    highlight: boolean;
  }[];
  public currentMonth: number;
  public currentYear: number;

  constructor() {
    let date = new Date(); //dia corriente
    this.currentMonth = date.getMonth(); //mes corriente
    this.currentYear = date.getFullYear(); //año corriente
    this.monthDayBlocks = [];
    this.days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fry', 'Sat'];
    this.months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    this.printCalendar(date);
  }

  printCalendar(date: Date) {
    this.monthDayBlocks = [];
    let year = date.getFullYear(); // año corriente
    let month = date.getMonth(); //mes corriente

    // Primer dia del mes (lunes, martes....)
    let dayone = new Date(year, month, 1).getDay();

    // Ultima fecha del mes (31,30,28)
    let lastdate = new Date(year, month + 1, 0).getDate();

    // Dia de la ultima fecha del mes (31 fue sabado)
    let dayend = new Date(year, month, lastdate).getDay();

    // Ultima fecha del anterior mes (es 5 de marzo, el ultimo dia del mes pasado fue 28 de febrero)
    let monthlastdate = new Date(year, month, 0).getDate();

    // Añadimos las fechas del mes anterior
    for (let i = dayone; i > 0; i--) {
      this.monthDayBlocks.push({
        value: monthlastdate - i + 1,
        disabled: true,
        highlight: false,
      });
    }

    // Añadimos el numero de día
    for (let i = 1; i <= lastdate; i++) {
      // Comprobamos si es HOY
      let isToday =
        i === date.getDate() &&
        month === new Date().getMonth() &&
        year === new Date().getFullYear();

      this.monthDayBlocks.push({
        value: i,
        disabled: false,
        highlight: isToday,
      });
    }

    // Añadimos las primeras fechas del mes siguiente
    for (let i = dayend; i < 6; i++) {
      this.monthDayBlocks.push({
        value: i - dayend + 1,
        disabled: true,
        highlight: false,
      });
    }
  }

  nextMonth(): void {
    if (this.currentMonth >= 11) {
      this.setMonth(0);
      this.setFullYear(this.currentYear + 1); //se puede hacer en un metodo junto con prevMonth.
    } else {
      this.setMonth(this.currentMonth + 1);
    }
  }

  prevMonth(): void {
    if (this.currentMonth <= 0) {
      this.setMonth(11);
      this.setFullYear(this.currentYear - 1);
    } else {
      this.setMonth(this.currentMonth - 1);
    }  }

  setMonth(month: number): void {
    let date = new Date(); //creamos una nueva fecha
    this.currentMonth = month; // igualamos el mes corriente al mes dado por parámetro
    date.setMonth(this.currentMonth); // asignamos el valor
    this.printCalendar(date); // añadimos al array de días del mes.
  }

  setFullYear(year: number): void {
    let date = new Date(); //creamos una nueva fecha,
    this.currentYear = year; //igualamos el año corriente al año dado por parámetro
    date.setFullYear(this.currentYear); //asignamos el valor
  }
}
