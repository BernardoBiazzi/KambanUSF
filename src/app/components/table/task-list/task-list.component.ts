import { Task } from 'src/app/models/task.model';
import { TaskList } from '../../../models/taskList.model';
import { DragdropService } from '../../../services/dragdrop.service';
import { KambanApiService } from '../../../services/kamban-api.service';
import { Component, Input, OnInit } from '@angular/core';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

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

  private subscribeToTasksChanges() {
    this.kambanApi.tasksChanges.subscribe(() => {
      this.getTaskListOrder(); //não precisa quando vier da API
      this.getTasks();
      this.updateTaskListOrder();
    });
  }

  private subscribeToIsDraggable() {
    this.dragdropService.isDraggable.subscribe(() => {
      this.isDraggable = !this.isDraggable;
    })
  }

  private getTaskListOrder() {
    const taskListOrder = localStorage.getItem(`${this.taskList.status}:order`);
    if(taskListOrder) this.taskList.tasksOrder = taskListOrder;
  }

  private getTasks() {
    this.tasks = this.kambanApi.getTasksByTaskList(this.taskList);
  }

  drop(event: any) {

    if (event.previousContainer == event.container) {

      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.updateTaskListOrder();

    } else {

      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      this.updateTaskListOrder();

      const droppedTask: Task = event.container.data[event.currentIndex];
      const newTaskStatus: string = event.container.id;
      this.updateTaskStatus(droppedTask, newTaskStatus);

      const previousTaskListTasks: Task[] = event.previousContainer.data;
      const previousTaskListStatus: string = event.previousContainer.id;
      this.updatePreviousTaskListOrder(previousTaskListTasks, previousTaskListStatus);

    }

  }

  private updateTaskStatus(task: Task, newStatus: string) {
    let updatedTask = Object.assign(task, { status: newStatus });
    this.kambanApi.updateTask(updatedTask);
  }

  //update será na API quando houver endpoint
  private updateTaskListOrder() {
    let taskOrder = '';
    this.tasks.forEach((task: Task) => { taskOrder = taskOrder + `${task.taskId},`});
    localStorage.setItem(`${this.taskList.status}:order`, taskOrder);
  }

  //update será na API quando houver endpoint
  private updatePreviousTaskListOrder(tasks: any[], taskListStatus: string) {
    let taskOrder = '';
    tasks.forEach((task: Task) => { taskOrder = taskOrder + `${task.taskId},`});
    localStorage.setItem(`${taskListStatus}:order`, taskOrder);
  }

}
