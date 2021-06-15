import { Component, Input, OnInit } from '@angular/core';
import { TaskList } from 'src/app/models/taskList.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  @Input() taskList!: TaskList;

  borderTop: string = '';

  constructor() { }

  ngOnInit() {
    this.borderTop = `${this.taskList.borderColor} 7px solid`
  }

}
