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
      tasks: []
    },
    {
      title: 'TO DO',
      borderColor: '#ffd400',
      status: 't',
      tasks: []
    },
    {
      title: 'DOING',
      borderColor: '#00fff3',
      status: 'd',
      tasks: []
    },
    {
      title: 'CLOSED',
      borderColor: '#3fff00',
      status: 'c',
      tasks: []
    }
  ]

  constructor(private kambanApi: KambanApiService) { }

  ngOnInit(): void {
    this.getTasks();
    this.subscribeToTasksChanges();
  }

  getTasks() {
    this.kambanApi.getTasks().then(() => this.getFilteredTasks());
  }

  subscribeToTasksChanges() {
    this.kambanApi.tasksChanges.subscribe(() => this.getFilteredTasks());
  }

  getFilteredTasks() {
    this.taskLists.forEach((taskList) => {
      taskList = Object.assign(taskList, {tasks: this.kambanApi.getFilteredTasks(taskList.status)})
    });
  }

}
