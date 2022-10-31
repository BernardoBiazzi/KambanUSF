import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { TaskList } from 'src/app/models/taskList.model';
import { TaskService } from 'src/app/services/task.service';
import { DragdropService } from '../../services/dragdrop.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  isDraggable: boolean = true;
  taskLists: TaskList[] = [];

  constructor(private dragdropService: DragdropService,
    private taskService: TaskService) { }

  ngOnInit(): void {
    this.subscribeToIsDraggable();
    this.subscribeToTaskChanges();
    this.taskLists = this.taskService.requestTaskLists();
  }

  drop(event: any) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    this.taskService.updateTaskLists(this.taskLists);
  }

  subscribeToIsDraggable() {
    this.dragdropService.isDraggable.subscribe(() => {
      this.isDraggable = !this.isDraggable;
    })
  }

  subscribeToTaskChanges() {
    this.taskService.tasksChanges.subscribe(() => {
      this.taskLists = this.taskService.requestTaskLists();
    })
  }

}
