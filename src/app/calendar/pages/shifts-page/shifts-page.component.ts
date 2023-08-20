import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { ValidatorService } from '../../services/validator.service';
import { ShiftObject } from '../../interfaces/ShiftObject';

@Component({
  selector: 'app-shifts-page',
  templateUrl: './shifts-page.component.html',
  styleUrls: ['./shifts-page.component.css'],
})
export class ShiftsPageComponent implements OnInit {
  public allShifts: FormGroup = this.fb.group({
    entryHours: this.fb.array([]),
    departureHours: this.fb.array([]),
    colors: this.fb.array([]),
  });

  public newEntryHours: FormControl = new FormControl('', Validators.required);
  public newDepartureHours: FormControl = new FormControl(
    '',
    Validators.required
  );
  public newColors: FormControl = new FormControl('', Validators.required);

  public shiftObject: ShiftObject = {
    entryTime: [],
    departureTime: [],
    colors: [],
  };

  constructor(
    private fb: FormBuilder,
    private validatorService: ValidatorService
  ) {}

  ngOnInit(): void {
    this.loadFromLocalStorage();
  }

  get entryTime() {
    return this.allShifts.get('entryHours') as FormArray;
  }
  get departureTime() {
    return this.allShifts.get('departureHours') as FormArray;
  }
  get color() {
    return this.allShifts.get('colors') as FormArray;
  }

  addNewTimeAndColor() {
    //comprobamos que esten los campos rellenos.
    if (
      this.newEntryHours.invalid ||
      this.newDepartureHours.invalid ||
      this.newColors.invalid
    )
      return;

    //creamos  constantes para almacenar los datos para el nuevo array
    const newEntryTime = this.newEntryHours.value;
    const newDepartureTime = this.newDepartureHours.value;
    const newColor = this.newColors.value;

    //creamos el array
    this.entryTime.push(this.fb.control(newEntryTime));
    this.departureTime.push(this.fb.control(newDepartureTime));
    this.color.push(this.fb.control(newColor));

    this.shiftObject.entryTime = this.entryTime.controls.map(
      (control) => control.value
    );
    this.shiftObject.departureTime = this.departureTime.controls.map(
      (control) => control.value
    );
    this.shiftObject.colors = this.color.controls.map(
      (control) => control.value
    );
    this.saveToLocalStorage();

    //reseteamos los campos originales.
    this.newEntryHours.reset();
    this.newDepartureHours.reset();
    this.newColors.reset();
  }

  deleteSavedTime(index: number): void {
    // borramos del localstorage
    const deleteLocalStorage = this.entryTime.at(index).value;
    localStorage.removeItem(deleteLocalStorage);

    // Eliminamos el objeto tasksAndDatesObject
    this.shiftObject.entryTime.splice(index, 1);
    this.shiftObject.departureTime.splice(index, 1);
    this.shiftObject.colors.splice(index, 1);

    //volvemos a guardar el objeto modificado
    this.saveToLocalStorage();

    //borramos la tarea mostrada
    this.entryTime.removeAt(index);
    this.departureTime.removeAt(index);
    this.color.removeAt(index);
  }

  onSubmit(): void {
    if (this.allShifts.invalid) {
      this.allShifts.markAllAsTouched();
      return;
    }

    this.allShifts.reset();
  }

  saveToLocalStorage() {
    localStorage.setItem('Shifts', JSON.stringify(this.shiftObject));
  }

  loadFromLocalStorage() {
    const storedData = localStorage.getItem('Shifts');

    if (storedData) {
      const parsedData = JSON.parse(storedData) as ShiftObject;

      this.shiftObject = parsedData;

      // Actualizar los arrays
      this.entryTime.clear();
      this.departureTime.clear();
      this.color.clear();

      this.shiftObject.entryTime.forEach((hour: any) => {
        this.entryTime.push(this.fb.control(hour));
      });

      this.shiftObject.departureTime.forEach((hour: any) => {
        this.departureTime.push(this.fb.control(hour));
      });

      this.shiftObject.colors.forEach((color: any) => {
        this.color.push(this.fb.control(color));
      });
    }
  }
}
