import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskList } from 'src/app/models/taskList.model';
import { TableService } from 'src/app/services/table.service';
import { TaskService } from 'src/app/services/task.service';
import { kambanTaskLists } from './models/kamban.model';
import { scrumTaskLists } from './models/scrum.model';
import { leanTaskLists } from './models/lean.model';

@Component({
  selector: 'app-new-table',
  templateUrl: './new-table.component.html',
  styleUrls: ['./new-table.component.scss']
})
export class NewTableComponent implements OnInit {

  constructor(
    private tableService: TableService,
    private taskService: TaskService,
    private router: Router) { }

  ngOnInit(): void {
  }

  startEmpty(): void {
    const tableId = this.tableService.addNewTable('New Workspace');
    this.router.navigate([`./table/${tableId}`]);
  }

  startWithKamban(): void {
    const tableId = this.tableService.addNewTable('Kamban Workspace');
    this.router.navigate([`./table/${tableId}`]).then(() => {
      kambanTaskLists.forEach((taskList: TaskList) => {
        this.taskService.addNewTaskList(taskList);
      });
    });
  }

  startWithScrum(): void {
    const tableId = this.tableService.addNewTable('Scrum Workspace');
    this.router.navigate([`./table/${tableId}`]).then(() => {
      scrumTaskLists.forEach((taskList: TaskList) => {
        this.taskService.addNewTaskList(taskList);
      });
    });
  }

  startWithLean(): void {
    const tableId = this.tableService.addNewTable('Lean Workspace');
    this.router.navigate([`./table/${tableId}`]).then(() => {
      leanTaskLists.forEach((taskList: TaskList) => {
        this.taskService.addNewTaskList(taskList);
      });
    });
  }

}
