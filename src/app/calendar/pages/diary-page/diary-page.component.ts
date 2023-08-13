import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { ValidatorService } from '../../services/validator.service';

enum allTasksTypes {
  dates = 'dates',
  tasks = 'tasks',
}

@Component({
  selector: 'app-diary-page',
  templateUrl: './diary-page.component.html',
  styleUrls: ['./diary-page.component.css'],
})
export class DiaryPageComponent {
  public allTasks: FormGroup = this.fb.group({
    tasks: this.fb.array([]),
    dates: this.fb.array([]),
  });

  public newTask: FormControl = new FormControl('', Validators.required);
  public newDate: FormControl = new FormControl('', Validators.required);

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService
  ) {}

  get tasks() {
    return this.allTasks.get(allTasksTypes.tasks) as FormArray;
  }
  get dates() {
    return this.allTasks.get(allTasksTypes.dates) as FormArray;
  }

  addNewTaskAndDate() {
    //comprobamos que esten los campos rellenos.
    if (this.newTask.invalid || this.newDate.invalid) return;

    //creamos 2 constantes para almacenar los datos para el nuevo array
    const newDayTask = this.newTask.value;
    const newDate = this.newDate.value;
    //creamos el array
    this.tasks.push(this.fb.control(newDayTask));
    this.dates.push(this.fb.control(newDate));
    //reseteamos los campos originales.
    this.newTask.reset();
    this.newDate.reset();
  }

  deleteSavedTask(index: number): void {
    //borramos la tarea almacenada
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

 /* isValidField(field: string): boolean | null {

    //llamamos al servicio para comprobar si los campos son válidos.
    return this.validatorService.isValidField(this.allTasks, field);
  }*/
}
