import { Task } from '../models/task.model';
import { TaskList } from '../models/taskList.model';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { FakeApiService } from './fake-api.service';

@Injectable({ providedIn: 'root' })
export class TaskService {

  @Output() tasksChanges: EventEmitter<any> = new EventEmitter();

  constructor(private fakeApiService: FakeApiService) { }

  updateTaskLists(taskLists: TaskList[]) {
    this.fakeApiService.updateTaskLists(taskLists);
  }

  requestTaskLists(): TaskList[] {
    return this.fakeApiService.getTaskLists();
  }

  getTaskListById(taskListId: number): TaskList {
    return this.fakeApiService.getTaskListById(taskListId);
  }

  addNewTaskList(newTaskList: TaskList) {
    this.fakeApiService.addTaskList(newTaskList).then(() => {
      this.tasksChanges.emit();
    }).catch((error) => {this.handleError(error)});
  }

  updateTaskList(taskListToUpdate: TaskList) {
    this.fakeApiService.updateTaskList(taskListToUpdate).then(() => {
      this.tasksChanges.emit();
    }).catch((error) => {this.handleError(error)});
  }

  deleteTaskList(taskListToDelete: TaskList) {
    this.fakeApiService.deleteTaskList(taskListToDelete).then(() => {
      this.tasksChanges.emit();
    }).catch((error) => {this.handleError(error)});
  }

  addNewTask(newTask: Task, taskListId: number) {
    this.fakeApiService.addTask(newTask, taskListId).then(() => {
      this.tasksChanges.emit();
    }).catch((error) => {this.handleError(error)});
  }

  updateTask(taskToUpdate: Task, taskListId: number) {
    this.fakeApiService.updateTask(taskToUpdate, taskListId).then(() => {
      this.tasksChanges.emit();
    }).catch((error) => {this.handleError(error)});
  }

  deleteTask(taskToDelete: Task, taskListId: number) {
    this.fakeApiService.deleteTask(taskToDelete, taskListId).then(() => {
      this.tasksChanges.emit();
    }).catch((error) => {this.handleError(error)});
  }

  private handleError(error: any) {
    alert('Falha ao adicionar Task');
    console.error(error);
    this.tasksChanges.emit();
  }

}
