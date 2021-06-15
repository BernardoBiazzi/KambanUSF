import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Task } from '../../../../models/task.model';
import { KambanApiService } from '../../../../services/kamban-api.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() task!: Task;

  constructor(private kambanApi: KambanApiService) { }

  ngOnInit(): void {}

  deleteThisTask() {
    this.kambanApi.deleteTask(this.task);
  }

  updateThisTask() {}

}
