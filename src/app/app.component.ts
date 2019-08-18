import { Component, OnInit } from '@angular/core';
import { MenuItem, ConfirmationService, Message } from 'primeng/api';
import { TaskService } from './task.service';
import { Task } from './task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ConfirmationService]
})
export class AppComponent implements OnInit {

  items: MenuItem[];
  number: number;
  param: string;
  taksss: Task[];

  constructor(private taskService: TaskService, private confirmationService: ConfirmationService) {
    this.taskService.number.subscribe((res: number) => this.number = res);
  }

  ngOnInit(): void {
    this.items = [{
      label: 'Todo Application',
      items: [
        { label: 'My Day', routerLink: ['/myday'], icon: 'pi pi-align-justify' },
        { label: 'Important', routerLink: ['/important'], icon: 'pi pi-star-o' },
        { label: 'Archive', routerLink: ['/archive'], icon: 'pi pi-check' }
      ]
    }]

    this.taksss = this.taskService.getTasks();
    this.taskService.taskList.next(this.taksss);
  }

  filter() {
    if (this.param != null && this.param != '') {
      this.taksss = this.taskService.getTasks();
      this.taksss = this.taksss.filter((t: Task) => { return t.name.includes(this.param) });
      this.taskService.taskList.next(this.taksss);
    } else {
      this.taksss = this.taskService.getTasks();
      this.taskService.taskList.next(this.taksss);
    }
  }

  archive() {
    this.taskService.archive();
    this.taskService.taskList.subscribe((res: []) => this.taksss = res);
    this.taskService.taskList.next(this.taksss);
  }


  confirm() {
    this.confirmationService.confirm({
      message: 'This will archive the done tasks',
      header: 'Confirmation',
      icon: 'pi pi-replay',
      accept: () => {
        this.archive();
      }
    });
  }

}

