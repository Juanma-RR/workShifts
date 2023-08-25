import { Component, OnInit } from '@angular/core'
import { MenuItem } from 'primeng/api'

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {
  items: MenuItem[] | undefined
  buttonItems: MenuItem[] | undefined

  ngOnInit() {
    this.items = [
      {
        label: 'Main',
        icon: 'pi pi-fw pi-file',
        routerLink: 'main'
      },
      {
        label: 'Calendar',
        icon: 'pi pi-fw pi-calendar',
        routerLink: 'calendar'
      },
      {
        label: 'Diary',
        icon: 'pi pi-fw pi-book',
        routerLink: 'calendar/diary'
      },
      {
        label: 'Shifts',
        icon: 'pi pi-fw pi-clock',
        routerLink: 'calendar/shifts'
      }
    ]

    this.buttonItems = [
      {
        label: 'Login',
        icon: 'pi pi-fw pi-user',
        routerLink: 'login'
      },
      {
        label: 'Register',
        icon: 'pi pi-fw pi-user-plus',
        routerLink: 'register'
      }
    ]
  }
}
