import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { LoginPageComponent } from './login-page/login-page.component'
import { MainPageComponent } from './main-page/main-page.component'
import { RegisterPageComponent } from './register-page/register-page.component'
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component'

const routes: Routes = [
  {
    path: 'main',
    component: MainPageComponent
  },
  {
    path: 'calendar',
    loadChildren: () =>
      import('./calendar/calendar.module').then((m) => m.CustomCalendarModule)
  },
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: 'register',
    component: RegisterPageComponent
  },
  {
    path: '404',
    component: Error404PageComponent
  },
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '404'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
