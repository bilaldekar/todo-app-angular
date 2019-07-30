import { Injectable } from '@angular/core';
import { Task } from './task';

@Injectable()
export class TaskService {

    importants: string[];
    tasks: Task[];

    constructor() {
    }

    public getTasks() {
        let localStorageItem = JSON.parse(localStorage.getItem('tasks'));
        return localStorageItem == null ? [] : localStorageItem.tasks;
    }

    private setLocalStorageTasks(tasks: Task[]): void {
        localStorage.setItem('tasks', JSON.stringify({ tasks: tasks }));
    }

    public addTask(newtask: string) {
        let tasks = this.getTasks();
        tasks.push({ name: newtask, important: false });
        this.setLocalStorageTasks(tasks);
    }



    public getImportantTasks() {
        let localStorageItem = JSON.parse(localStorage.getItem('importants'));
        return localStorageItem == null ? [] : localStorageItem.importants;
    }

    private setLocalStorageImportantTasks(importants: Task[]): void {
        localStorage.setItem('importants', JSON.stringify({ importants: importants }));
    }

    public addImportant(imp: string) {
        let importants = this.getImportantTasks();
        importants.push(imp);
        this.setLocalStorageImportantTasks(importants);

        let tasks = this.getTasks();
        tasks.forEach(element => {
            if (element.name == imp) {
                element.important = true;
            }
        });
        this.setLocalStorageTasks(tasks);
    }

    public removeImportant(i: string) {
        let importants = this.getImportantTasks();

        const index = importants.indexOf(i, 0);
        if (index > -1) {
            importants.splice(index, 1);
        }

        this.setLocalStorageImportantTasks(importants);

        let tasks = this.getTasks();
        tasks.forEach(element => {
            if (element.name == i) {
                element.important = false;
            }
        });
        this.setLocalStorageTasks(tasks);
    }

}