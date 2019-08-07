import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TaskService } from './task.service';
import { Task } from './task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  items: MenuItem[];
  number: number;

  constructor(private taskService: TaskService) {
    this.taskService.number.subscribe((res: number) => this.number = res);
  }

  ngOnInit(): void {

    this.items = [{
      label: 'Todo Application',
      items: [
        { label: 'My Day', routerLink: ['/myday'], icon: 'pi pi-align-justify' }, //command: (event) => handleSelected(event)},
        { label: 'Important', routerLink: ['/important'], icon: 'pi pi-star-o' },
        { label: 'Archive', routerLink: ['/archive'], icon: 'pi pi-check' }
      ]
    }]
  }

  param: string;
  taksss: Task[];

  filter() {
    this.taskService.taskList.subscribe((res: []) => this.taksss = res);

    if (this.param != null && this.param != '') {
      this.taksss = this.taksss.filter((t: Task) => { return t.name.includes(this.param) });
    } else {
      this.taskService.getTasks();
    }

    this.taskService.taskList.next(this.taksss);
  }

}

