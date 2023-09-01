import { Component, OnInit } from '@angular/core'
import { MenuItem } from 'primeng/api'

@Component({
  selector: 'app-color-palette',
  templateUrl: './color-palette.component.html',
  styleUrls: ['./color-palette.component.css']
})
export class ColorPaletteComponent implements OnInit {
  items: MenuItem[] = []

  constructor() {}

  ngOnInit() {
    this.items = [
      {
        icon: 'pi pi-pencil'
      },
      {
        icon: 'pi pi-refresh'
      },
      {
        icon: 'pi pi-trash'
      },
      {
        icon: 'pi pi-upload'
      },
      {
        icon: 'pi pi-external-link'
      }
    ]
  }
}
