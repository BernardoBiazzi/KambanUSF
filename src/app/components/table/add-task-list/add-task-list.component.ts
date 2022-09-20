import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TaskList } from 'src/app/models/taskList.model';
import { TaskService } from 'src/app/services/task-service';

@Component({
  selector: 'app-add-task-list',
  templateUrl: './add-task-list.component.html',
  styleUrls: ['./add-task-list.component.css']
})
export class AddTaskListComponent implements OnInit {

  colors = [
    '#e3342f'.toUpperCase(),
    '#f6993f'.toUpperCase(),
    '#ffd400'.toUpperCase(),
    '#38c172'.toUpperCase(),
    '#3490dc'.toUpperCase(),
    '#a1a1a1'.toUpperCase(),
    '#9561e2'.toUpperCase(),
    '#f66d9b'.toUpperCase(),
    '#000000'.toUpperCase(),
  ];

  taskListForm = new FormGroup({
    title: new FormControl(''),
    borderColor: new FormControl(this.colors[6])
  });

  showFloatingColorSelector = false;
  showFormAddTaskList = false;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
  }

  toggleForm() {
    this.showFormAddTaskList = !this.showFormAddTaskList;
  }

  submit() {
    if (this.taskListForm.invalid) return;

    const taskList: TaskList = {
      id: 0,
      title: this.taskListForm.value.title || '',
      borderColor: this.taskListForm.value.borderColor || this.colors[5],
      tasks: []
    };

    this.taskService.addNewTaskList(taskList);
    this.toggleForm();
    this.resetForm();
  }

  resetForm() {
    this.taskListForm.setValue({
      title: 'Nova Lista de Tarefas',
      borderColor: this.colors[6]
    });
  }

  toggleColorSelector() {
    this.showFloatingColorSelector = !this.showFloatingColorSelector;
  }

  selectColor(color: string) {
    const currentTitle = this.taskListForm.value.title || '';
    this.taskListForm.setValue({title: currentTitle, borderColor: color});
    this.showFloatingColorSelector = false;
  }

}
