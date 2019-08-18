import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task';

@Component({
  selector: 'app-importanttask',
  templateUrl: './importanttask.component.html',
  styleUrls: ['./importanttask.component.css']
})
export class ImportanttaskComponent implements OnInit {

  impotantTasks: Task[];

  constructor(private myService: TaskService) {
    this.impotantTasks = this.myService.getImportantTasks();
  }

  ngOnInit() {

  }

}
