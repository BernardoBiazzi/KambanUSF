import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../../../../models/task.model';
import { TaskService } from '../../../../services/task.service';
import { faCircleCheck, faCircleDot, faCircleXmark, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { DragdropService } from '../../../../services/dragdrop.service';
import { faCircle } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  faPenSquare = faPenSquare;
  faTrashAlt = faTrashAlt;
  faCircle = faCircleDot;

  @Input() task!: Task;
  @Input() taskListId!: number;
  @Input() borderColor!: string;
  isEditing: boolean = false;

  constructor(private taskService: TaskService,
    private dragdropService: DragdropService) { }

  ngOnInit(): void {}

  deleteThisTask() {
    this.taskService.deleteTask(this.task, this.taskListId);
  }

  setIsEditing() {
    this.isEditing = !this.isEditing;
    this.dragdropService.setIsDraggable();
  }

}
