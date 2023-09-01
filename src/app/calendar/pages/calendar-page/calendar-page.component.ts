import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { MonthDayBlocks } from '../../interfaces/MonthDayBlocks'
import { isSameDate } from 'src/app/shared/utils/isSameDate'
import { Shift } from '../../interfaces/Shift'
import { Task } from '../../interfaces/Task'

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.css']
})
export class CalendarPageComponent implements OnInit {
  public days: string[]
  public months: string[]
  public monthDayBlocks: MonthDayBlocks[]
  public currentMonth: number
  public currentYear: number
  public shifts: Shift[] = []
  public taskExpandedId?: string
  public expandedTask: string[] = []

  constructor(private router: Router) {
    const date = new Date() //dia corriente
    this.currentMonth = date.getMonth() //mes corriente
    this.currentYear = date.getFullYear() //año corriente
    this.monthDayBlocks = []
    this.days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fry', 'Sat']
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
      'December'
    ]
    this.printCalendar(date)
  }

  ngOnInit(): void {
    this.loadTasksFromLocalStorage()
    this.loadDayBlocksFromLocalStorage()
  }

  printCalendar(date: Date) {
    this.loadTasksFromLocalStorage() // Cargar tareas almacenadas
    this.loadDayBlocksFromLocalStorage()
    this.monthDayBlocks = []

    // año corriente
    const year = date.getFullYear()

    //mes corriente
    const month = date.getMonth()

    // Primer dia del mes (lunes, martes....)
    const dayone = new Date(year, month, 1).getDay()

    // Ultima fecha del mes (31,30,28)
    const lastdate = new Date(year, month + 1, 0).getDate()

    // Dia de la ultima fecha del mes (31 fue sabado)
    const dayend = new Date(year, month, lastdate).getDay()

    // Ultima fecha del anterior mes (es 5 de marzo, el ultimo dia del mes pasado fue 28 de febrero)
    const monthlastdate = new Date(year, month, 0).getDate()

    // Añadimos las fechas del mes anterior
    for (let i = monthlastdate - dayone + 1; i <= monthlastdate; i++) {
      const date = new Date(year, month - 1, i).toISOString()

      this.monthDayBlocks.push({
        dayValue: i,
        monthValue: month - 1,
        yearValue: year,
        disabled: true,
        highlight: false,
        color: [],
        expanded: false,
        showDot: false,
        showTask: false,
        taskList: [],
        date
      })
    }

    // Añadimos el numero de día
    for (let i = 1; i <= lastdate; i++) {
      //creamos una fecha para el dia actual
      const currentDate = new Date(year, month, i)
      // Comprobamos si es HOY
      const isToday =
        currentDate.getDate() === new Date().getDate() &&
        currentDate.getMonth() === new Date().getMonth() &&
        currentDate.getFullYear() === new Date().getFullYear()

      const date = new Date(year, month, i).toISOString()

      this.monthDayBlocks.push({
        dayValue: i,
        monthValue: month,
        yearValue: year,
        disabled: false,
        highlight: isToday,
        color: [],
        expanded: false,
        showDot: false,
        showTask: false,
        taskList: [],
        date
      })
    }

    // Añadimos las primeras fechas del mes siguiente

    for (let i = 1; i <= 6 - dayend; i++) {
      const date = new Date(year, month + 1, i).toISOString()

      this.monthDayBlocks.push({
        dayValue: i,
        monthValue: month + 1,
        yearValue: year,
        disabled: true,
        highlight: false,
        color: [],
        expanded: false,
        showDot: false,
        showTask: false,
        taskList: [],
        date
      })
    }
  }

  nextMonth(): void {
    //se puede hacer en un metodo junto con prevMonth.
    if (this.currentMonth >= 11) {
      this.setMonth(0)
      this.setFullYear(this.currentYear + 1)
    } else {
      this.setMonth(this.currentMonth + 1)
    }
    this.printCalendar(new Date(this.currentYear, this.currentMonth))
    this.loadTasksFromLocalStorage() // Cargar tareas almacenadas
    this.loadDayBlocksFromLocalStorage()
  }

  prevMonth(): void {
    if (this.currentMonth <= 0) {
      this.setMonth(11)
      this.setFullYear(this.currentYear - 1)
    } else {
      this.setMonth(this.currentMonth - 1)
    }
    this.printCalendar(new Date(this.currentYear, this.currentMonth))
    this.loadTasksFromLocalStorage() // Cargar tareas almacenadas
    this.loadDayBlocksFromLocalStorage()
  }

  setMonth(month: number): void {
    //creamos una nueva fecha
    const date = new Date()
    // igualamos el mes corriente al mes dado por parámetro
    this.currentMonth = month
    // asignamos el valor
    date.setMonth(this.currentMonth)
    // añadimos al array de días del mes.

    this.printCalendar(date)
  }

  setFullYear(year: number): void {
    //creamos una nueva fecha,
    const date = new Date()
    //igualamos el año corriente al año dado por parámetro
    this.currentYear = year
    //asignamos el valor
    date.setFullYear(this.currentYear)
  }

  loadTasksFromLocalStorage() {
    //guardamos el localstorage en una constante
    const storedData = localStorage.getItem('tasksAndDates')
    //comprobamos si tenemos datos almacenados
    if (storedData) {
      //si los tenemos: guardamos en parsedData de tipo Task[]
      const parsedData = JSON.parse(storedData) as Task[]

      // Recorrer los tasks almacenados
      parsedData.forEach((task) => {
        // Encontrar el dayBlock correspondiente y asignar el task
        if (task.startDate === task.endDate) {
          this.addTaskToDayBlock(task, task.startDate)
        } else {
          this.addTaskToDayBlock(task, task.startDate)
          this.addTaskToDayBlock(task, task.endDate)
        }

        this.monthDayBlocks.forEach((dayBlock) => {
          if (dayBlock.taskList && dayBlock.taskList.length > 1)
            dayBlock.showDot = true
        })
      })
    }
  }

  loadDayBlocksFromLocalStorage() {
    const storedDayBlocks = localStorage.getItem('dayBlocks')

    if (storedDayBlocks) {
      const colorDayBlocks = JSON.parse(storedDayBlocks) as MonthDayBlocks[]
      colorDayBlocks.forEach((colorDayBlock) => {
        const matchingDayBlock = this.monthDayBlocks.find((dayBlock) =>
          isSameDate(dayBlock.date, colorDayBlock.date)
        )

        if (matchingDayBlock) {
          matchingDayBlock.color = colorDayBlock.color
        }
      })
    }
  }

  addColorToDayBlock(color: string, date: string) {
    const dayBlockColor = this.monthDayBlocks.find((dayBlock) =>
      isSameDate(dayBlock.date, date)
    )
    if (dayBlockColor) {
      dayBlockColor.color.push(color)
    }
  }

  addTaskToDayBlock(task: Task, date: string) {
    const dayBlock = this.monthDayBlocks.find((dayBlock) =>
      isSameDate(dayBlock.date, date)
    )
    dayBlock?.taskList?.push(task)
  }

  toggleTask(task: Task): void | boolean {
    if (this.expandedTask.includes(task.id)) {
      const index = this.expandedTask.findIndex((el) => el === task.id)
      this.expandedTask.splice(index, 1)
    } else {
      this.expandedTask.push(task.id)
    }
  }

  redirectToDiary() {
    this.router.navigateByUrl('calendar/diary')
  }

  isSelected(id: string): boolean {
    return this.expandedTask.includes(id)
  }

  matchDayBlockShift(dayBlock: MonthDayBlocks, shift: Shift) {
    dayBlock.shift = shift
  }
}
