import { Injectable } from '@angular/core';
import { Task } from './task';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TaskService {

    public number = new BehaviorSubject(null);
    public taskList = new BehaviorSubject(null);

    constructor() {
    }

    public getTasks(): Task[] {
        let localStorageItem = JSON.parse(localStorage.getItem('tasks'));
        return localStorageItem != null ?  localStorageItem.tasks :  [];        
    }

    private setLocalStorageTasks(tasks: Task[]): void {
        localStorage.setItem('tasks', JSON.stringify({ tasks: tasks }));
    }

    public addTask(newtask: string) {
        let tasks = this.getTasks();
        tasks.push({ name: newtask, important: false, done: false, archive: false });
        this.setLocalStorageTasks(tasks);
        this.taskList.next(tasks);
        this.refreshTaskNumber();
    }

    public getImportantTasks() {
        let localStorageItem = JSON.parse(localStorage.getItem('tasks'));
        if (localStorageItem != null) {
            let imp: Task[] = localStorageItem.tasks;
            imp = imp.filter((t: Task) => { return t.important && !t.archive });
            return imp;
        }
    }

    public addImportant(imp: Task) {
        let tasks = this.getTasks();
        tasks.forEach(element => {
            if (element.name == imp.name) {
                element.important = true;
            }
        });
        this.setLocalStorageTasks(tasks);
    }

    public removeImportant(i: Task) {
        let tasks = this.getTasks();
        tasks.forEach(element => {
            if (element.name == i.name) {
                element.important = false;
            }
        });
        this.setLocalStorageTasks(tasks);
    }


    refreshTaskNumber() {
        this.number.next(this.getTasks().filter((t: Task) => { return !t.done }).length);
    }

    public setDone(task: Task) {
        let tasks = this.getTasks();
        tasks.forEach(element => {
            if (element.name == task.name) {
                element.done = true;
            }
        });
        this.setLocalStorageTasks(tasks);
        this.refreshTaskNumber();
    }

    public setUndone(task: Task) {
        let tasks = this.getTasks();
        tasks.forEach(element => {
            if (element.name == task.name) {
                element.done = false;
            }
        });
        this.setLocalStorageTasks(tasks);
        this.refreshTaskNumber();
    }

    archive() {
        let tasks = this.getTasks();
        tasks.forEach(element => {
            if (element.done) {
                element.archive = true;
            }
        });
        this.setLocalStorageTasks(tasks);
        this.taskList.next(tasks);
    }

    getArchive(): Task[] {
        let localStorageItem = JSON.parse(localStorage.getItem('tasks'));
        if (localStorageItem != null) {
            let archive: Task[] = localStorageItem.tasks;
            archive = archive.filter((t: Task) => { return t.archive });
            return archive;
        }
    }
}