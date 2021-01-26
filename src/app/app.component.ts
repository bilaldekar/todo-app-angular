import { Component, Inject, OnInit } from '@angular/core';
import { MenuItem, ConfirmationService, Message } from 'primeng-lts/api';
import { TaskService } from './task.service';
import { Task } from './task';
import { DOCUMENT } from '@angular/common';

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

  elem;
  navOpened: any = true;

  constructor(private taskService: TaskService, private confirmationService: ConfirmationService, @Inject(DOCUMENT) private document: any) {
    this.taskService.number.subscribe((res: number) => this.number = res);
  }

  ngOnInit(): void {

    if (!localStorage.getItem('tasks')) {
      localStorage.setItem('tasks', '{"tasks":[]}');
    }


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


    this.elem = document.documentElement;
    this.document.getElementById("sidebar").style.width = "190px";
    this.document.getElementById("main").style.marginLeft = "190px";
    this.document.getElementById("header").style.marginLeft = "190px";
    this.document.getElementById("header").style.width = "85%";
    this.navOpened = true;
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

