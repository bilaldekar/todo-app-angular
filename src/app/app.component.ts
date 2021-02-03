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
  isFullScreen: any = false;

  constructor(private taskService: TaskService, private confirmationService: ConfirmationService, @Inject(DOCUMENT) private document: any) {
    this.taskService.number.subscribe((res: number) => this.number = res);
  }

  ngOnInit(): void {
    this.elem = document.documentElement;

    if (!localStorage.getItem('tasks')) {
      localStorage.setItem('tasks', '{"tasks":[]}');
    }


    this.items = [{
      label: 'Tasks',
      items: [
        { label: 'Todo', routerLink: ['/myday'], icon: 'pi pi-align-justify' },
        { label: 'Important', routerLink: ['/important'], icon: 'pi pi-bookmark' },
        { label: 'Done', routerLink: ['/archive'], icon: 'pi pi-check' }
      ]
    }]

    this.taksss = this.taskService.getTasks();
    this.taskService.taskList.next(this.taksss);


    this.elem = document.documentElement;

    this.openNav();
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
      icon: 'pi pi-check-circle',
      accept: () => {
        this.archive();
      }
    });
  }


  openNav() {
    this.document.getElementById("sidebar").style.width = "197px";
    this.document.getElementById("main").style.marginLeft = "197px";
    this.document.getElementById("header").style.marginLeft = "181px";
    this.document.getElementById("header").style.width = "85%";
    this.navOpened = true;
  }

  closeNav() {
    this.document.getElementById("sidebar").style.width = "0";
    this.document.getElementById("main").style.marginLeft = "0";
    this.document.getElementById("header").style.marginLeft = "0";
    this.document.getElementById("header").style.width = "100%";
    this.navOpened = false;
  }

  openFullscreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
    this.isFullScreen = true;
  }

  closeFullscreen() {
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
    this.isFullScreen = false;
  }
}

