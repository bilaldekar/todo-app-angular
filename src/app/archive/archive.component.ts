import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { Task } from '../task';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {

  archive: Task[];

  constructor(private myService: TaskService) {
    this.archive = this.myService.getArchive();
    console.log(this.archive.length);
  }

  ngOnInit() {

  }

}
