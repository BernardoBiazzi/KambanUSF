import { Component, Input, OnInit, Output } from '@angular/core';
import { TaskList } from '../../../models/taskList.model';
import { EventEmitter } from '@angular/core';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { KambanApiService } from '../../../services/kamban-api.service';
import { Task } from 'src/app/models/task.model';
import { DragdropService } from '../../../services/dragdrop.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  @Input() taskList!: TaskList;
  tasks!: Task[];
  borderTop!: string;
  isDraggable: boolean = true;

  constructor(private kambanApi: KambanApiService,
    private dragdropService: DragdropService) { }

  ngOnInit() {
    this.borderTop = `${this.taskList.borderColor} 7px solid`;
    this.subscribeToTasksChanges();
    this.subscribeToIsDraggable();
  }

  subscribeToTasksChanges() {
    this.kambanApi.tasksChanges.subscribe(() => {
      this.getThisTaskListOrder(); //não precisa quando vier da API
      this.getThisTasks();
      this.updateThisTaskListOrder();
    });
  }

  getThisTaskListOrder() {
    let taskListOrder = localStorage.getItem(`${this.taskList.status}:order`);
    if(taskListOrder) this.taskList.tasksOrder = taskListOrder;
  }

  getThisTasks() {
    this.tasks = this.kambanApi.getTasksByTaskList(this.taskList);
  }

  drop(event: any) {
    if (event.previousContainer == event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.updateThisTaskListOrder();
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      this.changeTaskStatus(event.container.data[event.currentIndex], event.container.id)
      this.updatePreviousTaskListOrder(event.previousContainer.data, event.previousContainer.id);
      this.updateThisTaskListOrder();
    }
  }

  changeTaskStatus(task: Task, newStatus: string) {
    let updatedTask = Object.assign(task, { status: newStatus });
    this.kambanApi.updateTask(updatedTask);
  }

  //update será na API quando houver endpoint
  updateThisTaskListOrder() {
    let taskOrder = '';
    this.tasks.forEach((task: Task) => { taskOrder = taskOrder + `${task.taskId},`});
    localStorage.setItem(`${this.taskList.status}:order`, taskOrder);
  }

  //update será na API quando houver endpoint
  updatePreviousTaskListOrder(tasks: any[], taskListStatus: string) {
    let taskOrder = '';
    tasks.forEach((task: Task) => { taskOrder = taskOrder + `${task.taskId},`});
    localStorage.setItem(`${taskListStatus}:order`, taskOrder);
  }

  subscribeToIsDraggable() {
    this.dragdropService.isDraggable.subscribe(() => {
      this.isDraggable = !this.isDraggable;
    })
  }

}
