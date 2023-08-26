import { Component, OnInit } from '@angular/core'
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms'

import { Task } from '../../interfaces/Task'

import { generateRandomColor } from 'src/app/shared/utils/generateRamdomColor'
import { generateRandomId } from 'src/app/shared/utils/generateRandomId'

@Component({
  selector: 'app-diary-page',
  templateUrl: './diary-page.component.html',
  styleUrls: ['./diary-page.component.css']
})
export class DiaryPageComponent implements OnInit {
  public newForm = new FormGroup<Task>({
    title: new FormControl<string>('', Validators.required),
    description: new FormControl<string>('', Validators.required),
    startDate: new FormControl<string>('', Validators.required),
    endDate: new FormControl<string>('', Validators.required),
    color: new FormControl<string>(''),
    id: new FormControl<string>('')
  })

  public list: FormArray<FormGroup<Task>> = new FormArray<FormGroup<Task>>([])

  ngOnInit(): void {
    this.loadFromLocalStorage()
  }

  saveToLocalStorage() {
    localStorage.setItem(
      'tasksAndDates',
      JSON.stringify(this.list.getRawValue())
    )
  }

  loadFromLocalStorage() {
    const storedData = localStorage.getItem('tasksAndDates')
    this.list.clear()
    if (storedData) {
      const parsedData = JSON.parse(storedData) as Task[]

      parsedData.forEach((el) => {
        this.list.push(
          new FormGroup<Task>({
            title: new FormControl<string>(el.title, Validators.required),
            description: new FormControl<string>(
              el.description,
              Validators.required
            ),
            startDate: new FormControl<string>(
              el.startDate,
              Validators.required
            ),
            endDate: new FormControl<string>(el.endDate, Validators.required),
            color: new FormControl<string>(el.color),
            id: new FormControl<string>(el.id)
          })
        )
      })
    }
  }

  add(): void {
    //generamos el id
    this.newForm.get('id')?.setValue(generateRandomId())

    //generamos y guardamos el color
    this.newForm.get('color')?.setValue(generateRandomColor())

    this.list.push(this.newForm)

    //guardamos en localStorage
    this.saveToLocalStorage()

    this.loadFromLocalStorage()
  }

  delete(index: number): void {
    this.list.removeAt(index)
    this.saveToLocalStorage()
  }

  adjustTextAreaHeight(event: Event) {
    const textarea = event.target as HTMLTextAreaElement
    if (textarea) {
      textarea.style.height = 'auto' // Reinicia la altura
      textarea.style.height = `${textarea.scrollHeight}px` // Ajusta la altura al contenido
    }
  }
}
