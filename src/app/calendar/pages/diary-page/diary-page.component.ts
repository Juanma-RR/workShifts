import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';

import { TasksAndDatesObject } from '../../interfaces/TasksAndDatesObject';

import { ValidatorService } from '../../services/validator.service';


//prueba de enum
enum allTasksTypes {
  tasks = 'tasks',
  dates = 'dates',
}

@Component({
  selector: 'app-diary-page',
  templateUrl: './diary-page.component.html',
  styleUrls: ['./diary-page.component.css'],
})
export class DiaryPageComponent implements OnInit {
  public allTasks: FormGroup = this.fb.group({
    tasks: this.fb.array([]),
    dates: this.fb.array([]),
  });

  public newTask: FormControl = new FormControl('', Validators.required);
  public newDate: FormControl = new FormControl('', Validators.required);

  public savedTask = '';
  public savedDate = '';
  public savedColors: string = '';

  public tasksAndDatesObject: TasksAndDatesObject = {
    tasks: [],
    dates: [],
    color: [],
  };

  public selectedTaskIndex: number = -1;

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService
  ) {}

  ngOnInit(): void {
    this.loadFromLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem(
      'tasksAndDates',
      JSON.stringify(this.tasksAndDatesObject)
    );
  }

  loadFromLocalStorage() {
    const storedData = localStorage.getItem('tasksAndDates');

    if (storedData) {
      const parsedData = JSON.parse(storedData) as TasksAndDatesObject;

      this.tasksAndDatesObject = parsedData;

      // Actualizar los arrays
      this.tasks.clear();
      this.dates.clear();

      this.tasksAndDatesObject.tasks.forEach((task: any) => {
        this.tasks.push(this.fb.control(task));
      });

      this.tasksAndDatesObject.dates.forEach((date: any) => {
        this.dates.push(this.fb.control(date));
      });
    }
  }

  get tasks() {
    // para el get usamos el enum (allTasksTypes.tasks), sin enum seria 'tasks' siendo esto la propiedad del formgroup 'alltasks'
    return this.allTasks.get(allTasksTypes.tasks) as FormArray;
  }
  get dates() {
    return this.allTasks.get(allTasksTypes.dates) as FormArray;
  }

  addNewTaskAndDate(): void {
    //comprobamos que esten los campos rellenos.
    if (this.newTask.invalid || this.newDate.invalid) return;

    //usamos las constantes para almacenar los datos para el nuevo array
    this.savedTask = this.newTask.value;
    this.savedDate = this.newDate.value;

    //generamos y guardamos el color
    this.savedColors = this.generateRandomColor();

    //creamos el array

    this.tasks.push(this.fb.control(this.savedTask));
    this.dates.push(this.fb.control(this.savedDate));

    //actualizamos el objeto para guardarlo
    this.tasksAndDatesObject.tasks = this.tasks.controls.map(
      (control) => control.value
    );
    this.tasksAndDatesObject.dates = this.dates.controls.map(
      (control) => control.value
    );

    this.tasksAndDatesObject.color.push(this.savedColors);

    //guardamos en localStorage
    this.saveToLocalStorage();

    //reseteamos los campos originales.
    this.newTask.reset();
    this.newDate.reset();
  }

  deleteSavedTask(index: number): void {
    // borramos del localstorage
    const deleteLocalStorage = this.dates.at(index).value;
    localStorage.removeItem(deleteLocalStorage);

    // Eliminamos el objeto tasksAndDatesObject
    this.tasksAndDatesObject.tasks.splice(index, 1);
    this.tasksAndDatesObject.dates.splice(index, 1);
    this.tasksAndDatesObject.color.splice(index, 1);

    //volvemos a guardar el objeto modificado
    this.saveToLocalStorage();

    //borramos la tarea almacenada del array
    this.tasks.removeAt(index);
    this.dates.removeAt(index);
  }

  onSubmit(): void {
    if (this.allTasks.invalid) {
      this.allTasks.markAllAsTouched();
      return;
    }

    this.allTasks.reset();
  }

  showTask(index: number): void {
    if (this.selectedTaskIndex === index) {
      this.selectedTaskIndex = -1; // Ocultar si se hace clic nuevamente
    } else {
      this.selectedTaskIndex = index;
    }
  }

  generateRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
