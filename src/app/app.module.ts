import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'

import { PrimeModule } from './prime/prime.module'

import { AppRoutingModule } from './app-routing.module'
import { SharedModule } from './shared/shared.module'
import { ColorPaletteModule } from './shared/color-palette/color-palette.module'

import { AppComponent } from './app.component'
import { LoginPageComponent } from './login-page/login-page.component'
import { MenubarComponent } from './menubar/menubar.component'
import { RegisterPageComponent } from './register-page/register-page.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    MenubarComponent,
    RegisterPageComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    PrimeModule,
    ReactiveFormsModule,
    SharedModule,
    ColorPaletteModule
  ],

  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule {}
