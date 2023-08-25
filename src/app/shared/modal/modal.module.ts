import { NgModule } from '@angular/core'

import { DialogModule } from 'primeng/dialog'
import { DropdownModule } from 'primeng/dropdown'
import { ButtonModule } from 'primeng/button'

import { ModalComponent } from './modal.component'
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [ModalComponent],

  imports: [DialogModule, DropdownModule, ButtonModule, FormsModule],

  exports: [ModalComponent]
})
export class ModalModule {}
