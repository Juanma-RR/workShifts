import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SpeedDialModule } from 'primeng/speeddial'
import { ToastModule } from 'primeng/toast'

import { ColorPaletteComponent } from './color-palette.component'

@NgModule({
  declarations: [ColorPaletteComponent],
  imports: [CommonModule, SpeedDialModule, ToastModule],
  exports: [ColorPaletteComponent]
})
export class ColorPaletteModule {}
