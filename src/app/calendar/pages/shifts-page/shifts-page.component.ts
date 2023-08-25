import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { Shift } from '../../interfaces/Shift';

import { generateRandomId } from 'src/app/shared/utils/generateRandomId';

@Component({
  selector: 'app-shifts-page',
  templateUrl: './shifts-page.component.html',
  styleUrls: ['./shifts-page.component.css'],
})
export class ShiftsPageComponent implements OnInit {
  public newForm = new FormGroup<Shift>({
    entryTime: new FormControl<string>('', Validators.required),
    departureTime: new FormControl<string>('', Validators.required),
    comment: new FormControl<string>('', Validators.required),
    color: new FormControl<string>('', Validators.required),
    id: new FormControl<string>('', Validators.required),
  });

  public list: FormArray<FormGroup<Shift>> = new FormArray<
    FormGroup<Shift>
  >([]);

  ngOnInit(): void {
    this.loadFromLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem(
      'shiftList',
      JSON.stringify(this.list.getRawValue())
    );
  }

  loadFromLocalStorage() {
    const storedData = localStorage.getItem('shiftList');
    this.list.clear();
    if (storedData) {
      const parsedData = JSON.parse(storedData) as Shift[];

      parsedData.forEach((el) => {
        this.list.push(
          new FormGroup<Shift>({
            entryTime: new FormControl<string>(
              el.entryTime,
              Validators.required
            ),
            departureTime: new FormControl<string>(
              el.departureTime,
              Validators.required
            ),
            comment: new FormControl<string>(el.comment, Validators.required),
            color: new FormControl<string>(el.color, Validators.required),
            id: new FormControl<string>(el.id, Validators.required),
          })
        );
      });
    }
  }

  add(): void {
    //generamos el id
    this.newForm.get('id')?.setValue(generateRandomId());

    this.list.push(this.newForm);

    //guardamos en localStorage
    this.saveToLocalStorage();

    this.loadFromLocalStorage();
  }

  delete(index: number): void {
    this.list.removeAt(index);
    this.saveToLocalStorage();
  }
}
