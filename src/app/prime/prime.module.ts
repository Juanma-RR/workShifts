import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { SplitButtonModule } from 'primeng/splitbutton';

@NgModule({
  exports: [
    ButtonModule,
    MenubarModule,
    MenuModule,
    SplitButtonModule,
  ],
})
export class PrimeModule {}
