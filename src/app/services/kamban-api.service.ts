import { Task } from '../models/task.model'
import { HttpClient } from '@angular/common/http'
import { TaskList } from '../models/taskList.model';
import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class KambanApiService {

  private Tasks: Task[] = [];
  @Output() tasksChanges: EventEmitter<any> = new EventEmitter();

  constructor(private httpClient: HttpClient) { }

  requestTasksFromServer() {
    this.httpClient.get('https://kanbusf.herokuapp.com/api/user/task').toPromise()
      .then((tasks: any) => {

        this.Tasks = tasks;
        this.tasksChanges.emit();

      }).catch((error: any) => {

        console.error(error);
        alert('Falha ao buscar tasks do server');

      });
  }

  getTasksByTaskList(taskList: TaskList) {
    let tasks = this.Tasks.filter((task) => task.status == taskList.status);
    return this.orderTasks(tasks, taskList.tasksOrder);
  }

  // Add Task Methods ------------------------

  addNewTask(newTask: any) {
    this.httpClient.post('https://kanbusf.herokuapp.com/api/user/task/', newTask).toPromise()
      .then((taskAdded: any) => this.pushNewTaskLocal(taskAdded))
      .catch((error: any) => this.failToAddTask(error));
  }

  private pushNewTaskLocal(taskAdded: Task) {
    this.Tasks.push(taskAdded);
    this.tasksChanges.emit();
  }

  private failToAddTask(error: any) {
    alert('Falha ao adicionar Task');
    console.error(error);
    this.tasksChanges.emit();
  }

  // Update Task Methods ------------------------

  updateTask(taskToUpdate: Task) {
    this.httpClient.put('https://kanbusf.herokuapp.com/api/user/task/', taskToUpdate).toPromise()
      .then((taskUpdated: any) => this.updateTaskLocal(taskUpdated))
      .catch((error: any) => this.failToUpdateTask(error));
  }

  private updateTaskLocal(taskUpdated: Task) {
    this.Tasks.forEach((task) => {if (task.taskId == taskUpdated.taskId) task = taskUpdated});
    this.tasksChanges.emit();
  }

  private failToUpdateTask(error: any) {
    alert('Falha ao atualizar Task');
    console.error(error);
    this.tasksChanges.emit();
  }

  // Delete Task Methods ------------------------

  deleteTask(taskToDelete: Task) {
    this.httpClient.delete('https://kanbusf.herokuapp.com/api/user/task/' + taskToDelete.taskId).toPromise()
      .then((taskDeleted: any) => this.deleteTaskLocal(taskDeleted))
      .catch((error: any) => this.failToDeleteTask(error));
  }

  private deleteTaskLocal(taskDeleted: Task) {
    this.Tasks = this.Tasks.filter((task) => task.taskId != taskDeleted.taskId );
    this.tasksChanges.emit();
  }

  private failToDeleteTask(error: any) {
    alert('Falha ao deletar Task');
    console.error(error);
    this.tasksChanges.emit();
  }

  // Order Methods ------------------------

  private orderTasks(tasks: Task[], taskListOrder: string) {
    let tasksOrder = taskListOrder.split(',');
    let tasksOrdered: Task[] = [];

    tasksOrder.forEach((taskId) => {
      let task = tasks.find((task) => task.taskId.toString() == taskId)
      if (task) tasksOrdered.push(task);
    })

    return Object.assign(tasks, tasksOrdered);
  }

}
