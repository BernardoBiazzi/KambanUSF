import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TableComponent } from './components/table/table.component';
import { TaskComponent } from './components/table/task-list/task/task.component';
import { NewTaskComponent } from './components/table/task-list/new-task/new-task.component';
import { TaskListComponent } from './components/table/task-list/task-list.component';
import { EditTaskComponent } from './components/table/task-list/task/edit-task/edit-task.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AddTaskListComponent } from './components/table/add-task-list/add-task-list.component'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TableComponent,
    TaskComponent,
    NewTaskComponent,
    EditTaskComponent,
    TaskListComponent,
    AddTaskListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    DragDropModule,
    ReactiveFormsModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
