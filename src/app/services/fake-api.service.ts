import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskList } from '../models/taskList.model';

@Injectable({ providedIn: 'root' })
export class FakeApiService {

  constructor() { }

  updateTaskLists(taskLists: TaskList[]) {
    localStorage.setItem('fakeTaskLists', JSON.stringify(taskLists));
  }

  getTaskLists(): TaskList[] {
    const taskListsStringify = localStorage.getItem('fakeTaskLists') || '{}';
    const taskLists: TaskList[] = JSON.parse(taskListsStringify);
    if (taskLists.length > 0) return taskLists;
    else return [];
  }

  getTaskListById(taskListId: number): TaskList {
    const taskList = this.getTaskLists().find((tasklist) => tasklist.id == taskListId);
    if (taskList) return taskList;
    else return {} as TaskList;
  }

  addTaskList(taskListToAdd: TaskList): Promise<TaskList> {
    taskListToAdd.id = this.getNewTaskListId();
    let taskLists: TaskList[] = this.getTaskLists();
    taskLists.push(taskListToAdd);
    this.updateTaskLists(taskLists);

    return new Promise((resolve, reject) => {
      resolve(taskListToAdd);
    });
  }

  updateTaskList(taskListToUpdate: TaskList): Promise<TaskList> {
    let taskLists: TaskList[] = this.getTaskLists();
    let taskListIndex: number = 0;

    let newTaskLists = taskLists.filter((taskList: TaskList, index: number) => {
      if (taskList.id == taskListToUpdate.id) taskListIndex = index;
      return taskList.id != taskListToUpdate.id
    });

    if (taskListIndex > 0) newTaskLists.splice(taskListIndex, 0, taskListToUpdate);
    else newTaskLists.unshift(taskListToUpdate);
    this.updateTaskLists(newTaskLists);

    return new Promise((resolve, reject) => {
      resolve(taskListToUpdate);
    });
  }

  deleteTaskList(taskListToDelete: TaskList): Promise<TaskList> {
    let taskLists: TaskList[] = this.getTaskLists();
    const newTaskLists = taskLists.filter((taskList: TaskList) => taskList.id != taskListToDelete.id);
    this.updateTaskLists(newTaskLists);

    return new Promise((resolve, reject) => {
      resolve(taskListToDelete);
    });
  }

  getNewTaskListId(): number {
    let taskLists: TaskList[] = this.getTaskLists();
    if (!taskLists) return 0;

    let max = 0;
    taskLists.forEach((taskList: TaskList) => {
      if (taskList.id > max) max = taskList.id;
    });

    return (max+1);
  }

  // --------------------------------

  getTasks(taskListId: number): Task[] {
    const taskList = this.getTaskLists().find((tasklist) => tasklist.id == taskListId);
    if (taskList && taskList.tasks.length > 0) return taskList.tasks;
    else return [] as Task[];
  }

  addTask(taskToAdd: Task, taskListId: number): Promise<Task> {
    taskToAdd.taskId = this.getNewTaskId();
    let taskList = this.getTaskListById(taskListId);
    if (taskList) taskList.tasks.push(taskToAdd);
    else return Promise.resolve(taskToAdd);

    return new Promise((resolve, reject) => {
      if (taskList) this.updateTaskList(taskList).then(() => resolve(taskToAdd));
    });
  }

  updateTask(taskToUpdate: Task, taskListId: number): Promise<Task> {
    let tasks: Task[] = this.getTasks(taskListId);
    let newtasks: Task[] = tasks.filter((task: Task) => task.taskId != taskToUpdate.taskId);
    newtasks.push(taskToUpdate);

    let taskList = this.getTaskListById(taskListId);
    if (taskList) taskList.tasks = newtasks
    else return Promise.resolve(taskToUpdate);

    return new Promise((resolve, reject) => {
      if (taskList) this.updateTaskList(taskList).then(() => resolve(taskToUpdate));
    });
  }

  deleteTask(taskToDelete: Task, taskListId: number): Promise<Task> {
    let taskList = this.getTaskListById(taskListId);
    const tasks = taskList ? taskList.tasks.filter((task: Task) => task.taskId != taskToDelete.taskId) : [];
    if (taskList) taskList.tasks = tasks
    else return Promise.resolve(taskToDelete);

    return new Promise((resolve, reject) => {
      if (taskList) this.updateTaskList(taskList).then(() => resolve(taskToDelete));
    });
  }

  getNewTaskId(): number {
    let max = 0;

    this.getTaskLists().forEach((taskList) => {
      taskList.tasks.forEach((task: Task) => {
        if (task.taskId && task.taskId > max) max = task.taskId;
      });
    })

    return (max+1);
  }

}
