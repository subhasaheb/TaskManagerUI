import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormsModule } from '@angular/forms';

import {TaskService} from '../task.service';
// import {Router,ActivatedRoute} from '@angular/router';
// import {HttpClientModule} from '@angular/common/http';
import {TaskDetals} from '../Models/TaskDetail';
// import {ParentTaskDetails} from '../Models/TaskDetail';
import {TaskSearchPipe} from '../task-search.pipe';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']  
})
export class TaskListComponent implements OnInit {

  taskList: TaskDetals[];
  task: TaskDetals;
//taskList: Array<any> = [];
  errorMessage: any;
  currentId: number = 0;

//search parameter
  serarchText: string ='';
  taskNameSearch: string = '';
  parentTaskNameSearch: string = '';
  priorityFromSearch: number;
  priorityToSearch: number;
  startDateSearch: string;
  endDateSearch: string;

  
  constructor( private _taskService : TaskService, private _router: Router,
  private _activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    if(this._activatedRoute.snapshot.params["id"])
      this.currentId = parseInt(this._activatedRoute.snapshot.params["id"]);
    this.getGetTaskList();

    // this._taskService.GetAll()
    // .subscribe(p=>this.taskList=p)

    //var xyz = this.taskList;
  }

  getGetTaskList(){
    this._taskService.getTaskList().subscribe(
        data => this.taskList = data,
        error => { 
          this.errorMessage = error
        }
    )

    // this._taskService.getTaskList()
    // .subscribe(p=>this.taskList=p,
    // error => {this.errorMessage = error}
    // )

    var test = this.taskList;
  }

  add(){
    this._router.navigate(['taskList/add']);
  }
  edit(id){
    this._router.navigate(['taskList/edit/' + id])
  }

  checkButtoncon(condi: TaskDetals) : boolean{
    if(condi !=null)
    {
      if(condi.IsActive == "False")
        {
          return true;
        }
      else
        {
          return false;
        }
    }
    else
    {
      return false;
    }
    
  }
  endTask(id){
    var ans = confirm("Do you want to end Task with Id: " + id);
    if(ans){
      this._taskService.endTask(id)
          .subscribe(taskId => {
            //alert('Saved Successfully!')
            this._router.navigate(['taskList', {id: taskId}]);
         }, error => this.errorMessage = error )
    }
  }

}
