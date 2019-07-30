import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
    selector: 'app-tasklist',
    templateUrl: './tasklist.component.html',
    styleUrls: ['./tasklist.component.css']
})
export class TasklistComponent implements OnInit {

    today: string;
    tasks: Task[];
    task: any;
    error : boolean;

    @ViewChild('newtask') newtask: ElementRef;

    constructor(public datepipe: DatePipe, private taskService: TaskService) {
        this.tasks = this.taskService.getTasks();
    }

    ngOnInit(): void {
        this.today = this.datepipe.transform(new Date(), 'EEEE, d MMMM yyyy');
    }

    add(newtask: string) {
        if (newtask != null && newtask != '') {
            if (!this.tasks.some(el => el.name === newtask)) {
                this.taskService.addTask(newtask);
                this.tasks = this.taskService.getTasks();
                this.newtask.nativeElement.value = '';
                this.error = false;
            } else {
                this.error = true;
            }
        }
    }

    remove() {
        this.newtask.nativeElement.value = '';
        this.task = null;
        this.error = false;
    }

    switchImportant(task: Task) {
        if (task.important) {
            console.log(task.important);
            this.taskService.addImportant(task.name);
        }
        if (!task.important) {
            console.log(task.important);
            this.taskService.removeImportant(task.name);
        }
    }

}
