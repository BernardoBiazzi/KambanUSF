import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DragdropService {

  isDraggable: EventEmitter<any> = new EventEmitter();

  setIsDraggable() {
    this.isDraggable.emit();
  }

  constructor() { }
}
