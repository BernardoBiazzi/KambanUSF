import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../../../../models/task.model';
import { KambanApiService } from '../../../../services/kamban-api.service';
import { faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  faChevronRight = faChevronRight;
  faPenSquare = faPenSquare;
  faTrashAlt = faTrashAlt;

  @Input() task!: Task;
  isEditing: boolean = false;

  constructor(private kambanApi: KambanApiService) { }

  ngOnInit(): void {}

  deleteThisTask() {
    this.kambanApi.deleteTask(this.task);
  }

  setIsEditing() {
    this.isEditing = !this.isEditing;
  }

  updateThisTask() {}

}
