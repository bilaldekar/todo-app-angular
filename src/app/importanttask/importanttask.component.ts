import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-importanttask',
  templateUrl: './importanttask.component.html',
  styleUrls: ['./importanttask.component.css']
})
export class ImportanttaskComponent implements OnInit {

  impotantTasks: string[];

  constructor(private myService: TaskService) {
    this.impotantTasks = [];
    this.impotantTasks = this.myService.getImportantTasks();
    console.log(this.impotantTasks.length);
  }

  ngOnInit() {

  }

}
