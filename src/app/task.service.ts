import { Injectable } from '@angular/core';
import { Task } from './task';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TaskService {

    public number = new BehaviorSubject(null);
    public taskList = new BehaviorSubject(null);

    constructor() {
    }


    /*public getTasks() {
        let localStorageItem = JSON.parse(localStorage.getItem('tasks'));
        return localStorageItem == null ? [] : localStorageItem.tasks;
    }*/

    public getTasks(): Task[] {
        let localStorageItem = JSON.parse(localStorage.getItem('tasks'));
        if (localStorageItem != null) {
            this.taskList.next(localStorageItem.tasks);
            return localStorageItem.tasks;
        }
        //return localStorageItem == null ? [] : localStorageItem.tasks;
    }

    private setLocalStorageTasks(tasks: Task[]): void {
        localStorage.setItem('tasks', JSON.stringify({ tasks: tasks }));
    }

    public addTask(newtask: string) {
        let tasks = this.getTasks();
        tasks.push({ name: newtask, important: false, done: false });
        this.setLocalStorageTasks(tasks);
        this.setTaskNumber(this.getTasks().length);
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



    setTaskNumber(num: number) {
        this.number.next(num);
    }

    
    public setDone(task: Task) {
        let tasks = this.getTasks();
        tasks.forEach(element => {
            if(element.name == task.name){
                console.log('-------> '+element.name);
                element.done=true;
            }
        });
        this.setLocalStorageTasks(tasks);
    }

    public setUndone(task:Task){
        let tasks = this.getTasks();
        tasks.forEach(element => {
            if(element.name == task.name){
                console.log('-------> '+element.name);
                element.done=false;
            }
        });
        this.setLocalStorageTasks(tasks);
    }
}