import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormsModule } from '@angular/forms';

import {TaskService} from '../task.service';
// import {Router,ActivatedRoute} from '@angular/router';
// import {HttpClientModule} from '@angular/common/http';
import {TaskDetals} from '../Models/TaskDetail';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListComponent } from './task-list.component';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create the task list', () => {
  //   expect(component).toBeTruthy();
  // });
});
