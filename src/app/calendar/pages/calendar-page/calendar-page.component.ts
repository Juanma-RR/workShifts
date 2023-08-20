import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.css'],
})
export class CalendarPageComponent implements OnInit {
  public days: string[];
  public months: string[];
  public monthDayBlocks: {
    dayValue: number;
    monthValue?: number;
    yearValue?: number;
    disabled: boolean;
    highlight: boolean;
    task?: string;
    color?: string;
    showTask?: boolean;
    expanded?: boolean;
  }[];
  public currentMonth: number;
  public currentYear: number;

  constructor(private router: Router) {
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

  ngOnInit(): void {
    this.loadFromLocalStorage();
  }

  printCalendar(date: Date) {
    this.monthDayBlocks = [];

    // año corriente
    let year = date.getFullYear();

    //mes corriente
    let month = date.getMonth();

    // Primer dia del mes (lunes, martes....)
    let dayone = new Date(year, month, 1).getDay();

    // Ultima fecha del mes (31,30,28)
    let lastdate = new Date(year, month + 1, 0).getDate();

    // Dia de la ultima fecha del mes (31 fue sabado)
    let dayend = new Date(year, month, lastdate).getDay();

    // Ultima fecha del anterior mes (es 5 de marzo, el ultimo dia del mes pasado fue 28 de febrero)
    let monthlastdate = new Date(year, month, 0).getDate();

    // Añadimos las fechas del mes anterior
    for (let i = monthlastdate - dayone + 1; i <= monthlastdate; i++) {
      this.monthDayBlocks.push({
        dayValue: i,
        monthValue: month -1,
        yearValue: year,
        disabled: true,
        highlight: false,
      });
    }

    // Añadimos el numero de día
    for (let i = 1; i <= lastdate; i++) {
      //creamos una fecha para el dia actual
      let currentDate = new Date(year, month, i);
      // Comprobamos si es HOY
      let isToday =
        currentDate.getDate() === new Date().getDate() &&
        currentDate.getMonth() === new Date().getMonth() &&
        currentDate.getFullYear() === new Date().getFullYear();

      this.monthDayBlocks.push({
        dayValue: i,
        monthValue: month,
        yearValue: year,
        disabled: false,
        highlight: isToday,
      });
    }

    // Añadimos las primeras fechas del mes siguiente

    for (let i = 1; i <= 6 - dayend; i++) {
      this.monthDayBlocks.push({
        dayValue: i,
        monthValue: month + 1,
        yearValue: year,
        disabled: true,
        highlight: false,
      });
    }
  }

  nextMonth(): void {
    //se puede hacer en un metodo junto con prevMonth.
    if (this.currentMonth >= 11) {
      this.setMonth(0);
      this.setFullYear(this.currentYear + 1);
    } else {
      this.setMonth(this.currentMonth + 1);
    }
    this.printCalendar(new Date(this.currentYear, this.currentMonth));
    this.loadFromLocalStorage();
  }

  prevMonth(): void {
    if (this.currentMonth <= 0) {
      this.setMonth(11);
      this.setFullYear(this.currentYear - 1);
    } else {
      this.setMonth(this.currentMonth - 1);
    }
    this.printCalendar(new Date(this.currentYear, this.currentMonth));
    this.loadFromLocalStorage();
  }

  setMonth(month: number): void {
    //creamos una nueva fecha
    let date = new Date();
    // igualamos el mes corriente al mes dado por parámetro
    this.currentMonth = month;
    // asignamos el valor
    date.setMonth(this.currentMonth);
    // añadimos al array de días del mes.

    this.printCalendar(date);
  }

  setFullYear(year: number): void {
    //creamos una nueva fecha,
    let date = new Date();
    //igualamos el año corriente al año dado por parámetro
    this.currentYear = year;
    //asignamos el valor
    date.setFullYear(this.currentYear);
  }

  loadFromLocalStorage() {
    const storedData = localStorage.getItem('tasksAndDates');

    if (storedData) {
      const parsedData = JSON.parse(storedData) as {
        tasks: string[];
        dates: string[];
        color: string[];
      };

      // Recorrer los tasks almacenados
      parsedData.tasks.forEach((task, index) => {
        const taskDate = parsedData.dates[index];
        const color = parsedData.color[index];

        //separamos el año, mes y día en un array
        const datePart = taskDate.split('-');

        //convertimos el string en number, en la posicion 0 para sacar el año y hacemos lo mismo con el mes y el día
        const year = parseInt(datePart[0]);
        const month = parseInt(datePart[1]) - 1; // Los meses en JavaScript van de 0 a 11 por eso -1
        const day = parseInt(datePart[2]);

        // Encontrar el dayBlock correspondiente y asignar el task
        const matchingDayBlock = this.monthDayBlocks.find((dayBlock) => {
          return (
            dayBlock.dayValue === day &&
            dayBlock.monthValue === month &&
            dayBlock.yearValue === year
          );
        });

        if (matchingDayBlock) {
          matchingDayBlock.task = task;
          // Color almacenado
          matchingDayBlock.color = color;
          // Inicialmente ocultar el task
          matchingDayBlock.showTask = false;
        }
      });
    }
  }

  toggleTask(dayBlock: any): void | boolean {
    if (dayBlock.task.length < 15)
      return (dayBlock.showTask = !dayBlock.showTask);

    dayBlock.expanded = true;
    dayBlock.showTask = !dayBlock.showTask;
  }

  redirectToDiary() {
    this.router.navigateByUrl('calendar/diary');
  }
}
