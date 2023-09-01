import { NgModule } from '@angular/core'

import { ButtonModule } from 'primeng/button'
import { MenubarModule } from 'primeng/menubar'
import { MenuModule } from 'primeng/menu'
import { SplitButtonModule } from 'primeng/splitbutton'
import { SpeedDialModule } from 'primeng/speeddial'
import { ToastModule } from 'primeng/toast'
@NgModule({
  exports: [
    ButtonModule,
    MenubarModule,
    MenuModule,
    SplitButtonModule,
    SpeedDialModule,
    ToastModule
  ]
})
export class PrimeModule {}
