import { Component, Input, OnInit, Output } from '@angular/core';
import { TaskList } from 'src/app/models/taskList.model';
import { EventEmitter } from '@angular/core';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { KambanApiService } from '../../../services/kamban-api.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  @Input() taskList!: TaskList;
  @Output() onDropEvent: EventEmitter<any> = new EventEmitter();

  borderTop: string = '';

  constructor(private kambanApi: KambanApiService) { }

  ngOnInit() {
    this.borderTop = `${this.taskList.borderColor} 7px solid`
  }

  drop(event: any) {
    if (event.previousContainer == event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      let task = Object.assign(event.container.data[event.currentIndex], { status: event.container.id });
      this.kambanApi.changeTaskStatus(task);
    }
  }

}
