import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DragdropService } from 'src/app/services/dragdrop.service';
import { KambanApiService } from '../../../../services/kamban-api.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {

  @Input() status!: string;
  isAdding: boolean = false;
  newTask: string = '';
  newTaskDescription: string = '';

  constructor(private kambanApi: KambanApiService,
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

      let task = { titulo: this.newTask, descricao: this.newTaskDescription, status: this.status }
      this.setIsAdding();
      this.kambanApi.addNewTask(task);

    } else {

      alert('Informe titulo e descrição da task');

    }

  }

}
