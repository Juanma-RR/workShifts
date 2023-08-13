import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { ValidatorService } from '../../services/validator.service';

enum allShiftsTypes {
  time = 'time',
  color = 'color',
}
@Component({
  selector: 'app-shifts-page',
  templateUrl: './shifts-page.component.html',
  styleUrls: ['./shifts-page.component.css'],
})
export class ShiftsPageComponent {
  public allShifts: FormGroup = this.fb.group({
    time: this.fb.array([]),
    color: this.fb.array([]),
  });

  public newTime: FormControl = new FormControl('', Validators.required);
  public newColor: FormControl = new FormControl('', Validators.required);

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService
  ) {}

  get time() {
    return this.allShifts.get(allShiftsTypes.time) as FormArray;
  }
  get color() {
    return this.allShifts.get(allShiftsTypes.color) as FormArray;
  }

  addNewTimeAndColor() {
    //comprobamos que esten los campos rellenos.
    if (this.newTime.invalid || this.newColor.invalid) return;

    //creamos 2 constantes para almacenar los datos para el nuevo array
    const newDayTask = this.newTime.value;
    const newDate = this.newColor.value;
    //creamos el array
    this.time.push(this.fb.control(newDayTask));
    this.color.push(this.fb.control(newDate));
    //reseteamos los campos originales.
    this.newTime.reset();
    this.newColor.reset();
  }

  deleteSavedTime(index: number): void {
    //borramos la tarea almacenada
    this.time.removeAt(index);
    this.color.removeAt(index);
  }

  onSubmit(): void {
    if (this.allShifts.invalid) {
      this.allShifts.markAllAsTouched();
      return;
    }

    this.allShifts.reset();
  }

  /* isValidField(field: string): boolean | null {

    //llamamos al servicio para comprobar si los campos son válidos.
    return this.validatorService.isValidField(this.allTasks, field);
  }*/
}
