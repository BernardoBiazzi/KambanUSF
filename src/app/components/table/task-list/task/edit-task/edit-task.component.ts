import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../../../../../services/task.service';
import { Task } from '../../../../../models/task.model';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  @Input() task!: Task;
  @Input() taskListId!: number;
  @Output() isEditingEventEmitter: EventEmitter<any> = new EventEmitter();

  newTaskTitle!: string ;
  newTaskDescription!: string;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.newTaskTitle = this.task.titulo;
    this.newTaskDescription = this.task.descricao;
  }

  setIsEditing() {
    this.isEditingEventEmitter.emit();
  }

  editTask() {

    if (this.newTaskTitle != '' && this.newTaskDescription != '') {

      let task = Object.assign(this.task, { titulo: this.newTaskTitle, descricao: this.newTaskDescription});
      this.taskService.updateTask(task, this.taskListId);
      this.setIsEditing();

    } else {

      alert('Informe o titulo e descrição da task');

    }

  }

}
