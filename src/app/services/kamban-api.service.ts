import { EventEmitter, Injectable, Output } from '@angular/core';
import { Task } from '../models/task.model'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class KambanApiService {

  private Tasks: Task[] = [];
  @Output() tasksChanges: EventEmitter<any> = new EventEmitter();

  constructor(private httpClient: HttpClient) { }

  getTasks(): Promise<any> {

    let promise = new Promise((resolve, reject) => {

      this.httpClient.get('https://kanbusf.herokuapp.com/api/user/task').toPromise()
        .then((result: any) => {
          this.Tasks = result;
          resolve('sucess');
        }).catch((error) => {
          reject(error);
        });

    })

    return promise;
  }

  getFilteredTasks(status: string) {
    return this.Tasks.filter((task) => task.status == status);
  }

  addNewTask(newTask: any) {
    this.httpClient.post('https://kanbusf.herokuapp.com/api/user/task/', newTask).toPromise().then((taskAdded) => this.pushNewTaskLocal(taskAdded));
  }

  editTask(taskToEdit: Task) {
    this.httpClient.put('https://kanbusf.herokuapp.com/api/user/task/', taskToEdit).toPromise().then((taskEdited) => this.editTaskLocal(taskEdited));
  }

  changeTaskStatus(taskToEdit: Task) {
    this.httpClient.put('https://kanbusf.herokuapp.com/api/user/task/', taskToEdit).toPromise().catch(() => this.failStatusChange());
  }

  deleteTask(taskToDelete: Task) {
    this.httpClient.delete('https://kanbusf.herokuapp.com/api/user/task/' + taskToDelete.taskId).toPromise().then(() => this.deleteTaskLocal(taskToDelete));
  }

  pushNewTaskLocal(taskAdded: any) {
    this.Tasks.push(taskAdded);
    this.tasksChanges.emit();
  }

  editTaskLocal(taskEdited: any) {
    this.Tasks.forEach((task) => {if (task.taskId == taskEdited.taskId) task = taskEdited});
    this.tasksChanges.emit();
  }

  deleteTaskLocal(taskDeleted: any) {
    this.Tasks = this.Tasks.filter((task) => task.taskId != taskDeleted.taskId );
    this.tasksChanges.emit();
  }

  failStatusChange() {
    alert('Falha ao alterar status da Task');
    this.tasksChanges.emit();
  }

}
