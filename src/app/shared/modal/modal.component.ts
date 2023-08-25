import { Component, OnInit } from '@angular/core'
import { MonthDayBlocks } from 'src/app/calendar/interfaces/MonthDayBlocks'
import { Shift } from 'src/app/calendar/interfaces/Shift'

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  shifts: Shift[] = []

  selectedShift: Shift | undefined

  visible: boolean = false

  selectedDayBlock?: MonthDayBlocks

  dayBlockList: MonthDayBlocks[] = []

  ngOnInit() {
    this.loadFromLocalStorage()
  }

  //hacer visible el modal
  showDialog(dayBlock: MonthDayBlocks) {
    this.selectedDayBlock = dayBlock
    this.visible = true
  }

  loadFromLocalStorage() {
    const storedShift = localStorage.getItem('shiftList')
    const storedDayBlocks = localStorage.getItem('dayBlocks')

    if (storedShift) {
      this.shifts = JSON.parse(storedShift) as Shift[]
    }
    if (storedDayBlocks) {
      // usamos dayBlockList para cargar los shifts antiguos y poder añadir los nuevos.
      this.dayBlockList = JSON.parse(storedDayBlocks) as MonthDayBlocks[]
    }
  }

  selectShift(shift: Shift | undefined): void {
    this.visible = false

    if (this.selectedDayBlock) {
      this.dayBlockList.push(this.selectedDayBlock)
      this.selectedDayBlock.color = shift?.color || ''
      this.saveToLocalStorage()
    }
  }

  saveToLocalStorage() {
    localStorage.setItem('dayBlocks', JSON.stringify(this.dayBlockList))
  }
}
