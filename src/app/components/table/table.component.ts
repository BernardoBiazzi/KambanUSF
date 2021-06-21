import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { TaskList } from 'src/app/models/taskList.model';
import { KambanApiService } from '../../services/kamban-api.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  taskLists: TaskList[] = [
    {
      title: 'BACKLOG',
      borderColor: '#a1a1a1',
      status: 'b',
      tasksOrder: ''
    },
    {
      title: 'TO DO',
      borderColor: '#ffd400',
      status: 't',
      tasksOrder: ''
    },
    {
      title: 'DOING',
      borderColor: '#00fff3',
      status: 'd',
      tasksOrder: ''
    },
    {
      title: 'CLOSED',
      borderColor: '#3fff00',
      status: 'c',
      tasksOrder: ''
    }
  ]

  constructor() { }

  ngOnInit(): void { }

  drop(event: any) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

}
