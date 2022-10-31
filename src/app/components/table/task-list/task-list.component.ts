import { TaskList } from '../../../models/taskList.model';
import { DragdropService } from '../../../services/dragdrop.service';
import { TaskService } from '../../../services/task.service';
import { Component, Input, OnInit } from '@angular/core';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  @Input() taskList!: TaskList;
  borderTop!: string;
  isDraggable: boolean = true;
  faTrashAlt = faTrashAlt;

  constructor(private taskService: TaskService,
    private dragdropService: DragdropService) { }

  ngOnInit() {
    this.borderTop = `${this.taskList.borderColor} 7px solid`;
    this.subscribeToIsDraggable();
  }

  private subscribeToIsDraggable() {
    this.dragdropService.isDraggable.subscribe(() => {
      this.isDraggable = !this.isDraggable;
    })
  }

  drop(event: any) {

    if (event.previousContainer == event.container) {

      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.taskService.updateTaskList(this.taskList);

    } else {

      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      this.taskService.updateTaskList(this.taskList);

      let previousTaskList = this.taskService.getTaskListById(event.previousContainer.id);
      previousTaskList.tasks = event.previousContainer.data;
      this.taskService.updateTaskList(previousTaskList);

    }

  }

  deleteThisTaskList() {
    this.taskService.deleteTaskList(this.taskList);
  }

}
