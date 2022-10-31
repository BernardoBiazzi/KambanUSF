import { Component, Input, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { DragdropService } from 'src/app/services/dragdrop.service';
import { TaskService } from '../../../../services/task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

  @Input() taskListId!: number;
  isAdding: boolean = false;
  newTask: string = '';
  newTaskDescription: string = '';

  constructor(private taskService: TaskService,
    private dragdropService: DragdropService) { }

  ngOnInit(): void {}

  setIsAdding() {
    this.newTask = '';
    this.newTaskDescription = '';
    this.isAdding = !this.isAdding;
    this.dragdropService.setIsDraggable();
  }

  addNewTask() {

    if (this.newTask != '' && this.newTaskDescription != '') {

      let task: Task = { titulo: this.newTask, descricao: this.newTaskDescription }
      this.setIsAdding();
      console.log(task);
      this.taskService.addNewTask(task, this.taskListId);

    } else {

      alert('Informe titulo e descrição da task');

    }

  }

}
