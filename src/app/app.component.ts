import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  items: MenuItem[];

  constructor() {
  }

  ngOnInit(): void {

    this.items = [{
      label: 'Todo Application',
      items : [
        { label: 'My day', routerLink: ['/myday'], icon: 'pi pi-align-justify' }, //command: (event) => handleSelected(event)},
        { label: 'Important', routerLink: ['/important'], icon: 'pi pi-star-o' }
      ]}
    ]
  }
}
