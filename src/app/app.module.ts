import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';


import { PrimeModule } from './prime/prime.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginPageComponent } from './login-page/login-page.component';
import { MenubarComponent } from './menubar/menubar.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { SharedModule } from './shared/shared.module';



@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    MenubarComponent,
    RegisterPageComponent,

  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    PrimeModule,
    ReactiveFormsModule,
    SharedModule,

  ],

  providers: [],

  bootstrap: [AppComponent],
})


export class AppModule {}
