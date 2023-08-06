import { Component } from '@angular/core';

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
  constructor() {
    this.monthDayBlocks = [];
    this.days = [ 'Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fry', 'Sat'];
    this.months = [
      'Januaty',
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
  }
  
printCalendar(){
  let date = new Date(); //dia corriente
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

  nextMonth(month:number){



  }

  prevMonth(month:number){

  }
}
