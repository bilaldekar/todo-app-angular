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
    error: boolean;

    @ViewChild('newtask', { static: true }) newtask: ElementRef;

    constructor(public datepipe: DatePipe, private taskService: TaskService) {
        this.taskService.getTasks();
        this.taskService.taskList.subscribe(
            (res: []) => this.tasks = res.filter((t: Task) => { return !t.archive }));
        taskService.refreshTaskNumber();
    }

    ngOnInit(): void {
        this.today = this.datepipe.transform(new Date(), 'EEEE, d MMMM yyyy');
    }

    add(newtask: string) {
        if (newtask != null && newtask != '') {
            if (!this.tasks.some(el => el.name === newtask)) {
                this.taskService.addTask(newtask);
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

    important(task: Task) {
        this.taskService.addImportant(task);
        task.important = true;
    }

    notImportant(task: Task) {
        this.taskService.removeImportant(task);
        task.important = false;

    }

    done(task: Task) {
        this.taskService.setDone(task);
    }

    undone(task: Task) {
        this.taskService.setUndone(task);
    }

}
