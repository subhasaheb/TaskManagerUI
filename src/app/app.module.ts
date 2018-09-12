import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TaskListComponent } from './task-list/task-list.component';
import {TaskService} from './task.service';
import { TaskitemComponent } from './taskitem/taskitem.component';
import {TaskSearchPipe} from './task-search.pipe';
import { NavComponent } from './nav/nav.component';



@NgModule({
  declarations: [    
    AppComponent,
    TaskListComponent,
    TaskitemComponent,
    TaskSearchPipe,
    NavComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: "", redirectTo: "taskList", pathMatch: "full"},
      {path: "taskList", component: TaskListComponent},
      {path: "taskList/add", component: TaskitemComponent},
      {path: "taskList/edit/:id", component: TaskitemComponent},
      {path: "*", component: TaskListComponent}
    ])
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
