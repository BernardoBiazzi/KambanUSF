import { EventEmitter, Injectable, Output } from '@angular/core';
import { Task } from '../models/task.model'
import { HttpClient } from '@angular/common/http'
import { TaskList } from '../models/taskList.model';

@Injectable({
  providedIn: 'root'
})
export class KambanApiService {

  private Tasks: Task[] = [];
  @Output() tasksChanges: EventEmitter<any> = new EventEmitter();

  constructor(private httpClient: HttpClient) {
    this.requestTasksFromServer();
  }

  requestTasksFromServer() {

    this.httpClient.get('https://kanbusf.herokuapp.com/api/user/task').toPromise()
      .then((tasks: any) => {
        this.Tasks = tasks;
        this.tasksChanges.emit();
      }).catch(() => alert('Falha ao buscar tasks do server'));

  }

  getTasksByTaskList(taskList: TaskList) {
    let tasks = this.Tasks.filter((task) => task.status == taskList.status);
    return this.orderTasks(tasks, taskList.tasksOrder);
  }

  addNewTask(newTask: any) {
    this.httpClient.post('https://kanbusf.herokuapp.com/api/user/task/', newTask).toPromise().then((taskAdded) => this.pushNewTaskLocal(taskAdded));
  }

  updateTask(taskToUpdate: Task) {
    this.httpClient.put('https://kanbusf.herokuapp.com/api/user/task/', taskToUpdate).toPromise().then((taskUpdated) => this.updateTaskLocal(taskUpdated)).catch(() => this.failToUpdateTask());
  }

  deleteTask(taskToDelete: Task) {
    this.httpClient.delete('https://kanbusf.herokuapp.com/api/user/task/' + taskToDelete.taskId).toPromise().then(() => this.deleteTaskLocal(taskToDelete));
  }

  private orderTasks(tasks: Task[], taskListOrder: string) {
    let tasksOrder = taskListOrder.split(',');
    let tasksOrdered: Task[] = [];

    tasksOrder.forEach((taskId) => {
      let task = tasks.find((task) => task.taskId.toString() == taskId)
      if (task) tasksOrdered.push(task);
    })

    return Object.assign(tasks, tasksOrdered);
  }

  private pushNewTaskLocal(taskAdded: any) {
    this.Tasks.push(taskAdded);
    this.tasksChanges.emit();
  }

  private updateTaskLocal(taskUpdated: any) {
    this.Tasks.forEach((task) => {if (task.taskId == taskUpdated.taskId) task = taskUpdated});
    this.tasksChanges.emit();
  }

  private deleteTaskLocal(taskDeleted: any) {
    this.Tasks = this.Tasks.filter((task) => task.taskId != taskDeleted.taskId );
    this.tasksChanges.emit();
  }

  private failToUpdateTask() {
    alert('Falha ao atualizar Task');
    this.tasksChanges.emit();
  }

}
