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

  addNewTask(task: any) {
    this.httpClient.post('https://kanbusf.herokuapp.com/api/user/task/', task).toPromise().then((taskAdded) => this.pushNewTaskLocal(taskAdded));
  }

  editTask(task: Task): Promise<any>{
    return this.httpClient.put('https://kanbusf.herokuapp.com/api/user/task/', task).toPromise();
  }

  deleteTask(task: Task) {
    this.httpClient.delete('https://kanbusf.herokuapp.com/api/user/task/' + task.taskId).toPromise().then(() => this.deleteTaskLocal(task));
  }

  pushNewTaskLocal(newTask: any) {
    this.Tasks.push(newTask);
    this.tasksChanges.emit();
  }

  deleteTaskLocal(taskToDelete: any) {
    this.Tasks = this.Tasks.filter((task) => task.taskId != taskToDelete.taskId );
    this.tasksChanges.emit();
  }

}
