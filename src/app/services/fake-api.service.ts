import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class FakeApiService {

  constructor() { }

  getTasks(): Task[] {
    const tasksStringify = localStorage.getItem('fakeTasks') || '{}';
    const tasks: Task[] = JSON.parse(tasksStringify);
    if (tasks.length > 0) return tasks;
    else return [];
  }

  addTask(taskToAdd: Task): Promise<Task> {
    taskToAdd.taskId = this.getNewTaskId();
    let tasks: Task[] = this.getTasks();
    tasks.push(taskToAdd);
    localStorage.setItem('fakeTasks', JSON.stringify(tasks));

    return new Promise((resolve, reject) => {
      resolve(taskToAdd);
    });
  }

  updateTask(taskToUpdate: Task): Promise<Task> {
    let tasks: Task[] = this.getTasks();
    let newtasks = tasks.filter((task: Task) => task.taskId != taskToUpdate.taskId);
    newtasks.push(taskToUpdate);
    localStorage.setItem('fakeTasks', JSON.stringify(newtasks));

    return new Promise((resolve, reject) => {
      resolve(taskToUpdate);
    });
  }

  deleteTask(taskToDelete: Task): Promise<Task> {
    let tasks: Task[] = this.getTasks();
    const newtasks = tasks.filter((task: Task) => task.taskId != taskToDelete.taskId);
    localStorage.setItem('fakeTasks', JSON.stringify(newtasks));

    return new Promise((resolve, reject) => {
      resolve(taskToDelete);
    });
  }

  getNewTaskId(): number {
    let tasks: Task[] = this.getTasks();
    if (!tasks) return 0;

    let max = 0;
    tasks.forEach((task: Task) => {
      if (task.taskId > max) max = task.taskId;
    });

    return (max+1);
  }

}
