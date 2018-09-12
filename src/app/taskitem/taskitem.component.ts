import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {TaskService} from '../task.service';
import {TaskDetals} from '../Models/TaskDetail';


@Component({
  selector: 'app-taskitem',
  templateUrl: './taskitem.component.html',
  styleUrls: ['./taskitem.component.css']
})
export class TaskitemComponent implements OnInit {
  taskDetailForm: FormGroup;
  title: string = "Add";
  id: number = 0;
  errorMessage: any;
  submitted: boolean = false;
  _ref:any;
  taskObj: TaskDetals;
  isEnableOrDisable: boolean = false;

// TaskDetals taskObj = new TaskDetals();

  constructor(
    private _fb: FormBuilder,
    private _avRoute: ActivatedRoute,
    private _taskService: TaskService,
    private _router: Router) 
  { 

    if(this._avRoute.snapshot.params["id"]){
      this.id = parseInt( this._avRoute.snapshot.params["id"]);
      console.log(this.id);
        this.title = 'Edit';
    }

    this.taskDetailForm = this._fb.group({
      TaskID: 0,
      TaskName: ['', [Validators.required,Validators.maxLength(30)]],
      StartDate: ['',[Validators.required]],
      EndDate: ['',[Validators.required]],
      ParentTaskName: [''],
      Priority: [0,[Validators.required,Validators.minLength(0)]],
      IsActive: []
    })

  }

  save(){
    debugger;
    if(!this.taskDetailForm.valid){
      this.submitted = true;
      return;
    }

    this._taskService.saveTask(this.taskDetailForm.value)
        .subscribe(taskId => {
            //alert('Saved Successfully!')
            this._router.navigate(['taskList', {id: taskId}]);
         }, error => this.errorMessage = error )

  }

  cancel(){
    this._router.navigate(["taskList", {id: this.id}]);
  }
  onReset(){
    this.taskDetailForm.reset();
  }

  bindingwithobject(taskdetail: TaskDetals){
      this.taskObj = taskdetail;
      console.log(this.taskObj.StartDate.toString().substring(0,10));
      this.taskDetailForm.setValue(this.taskObj);
      this.taskDetailForm.controls["StartDate"].setValue(this.taskObj.StartDate.toString().substring(0,10));
      this.taskDetailForm.controls["EndDate"].setValue(this.taskObj.EndDate.toString().substring(0,10));

      //enabling/Disabling
          if(this.taskObj.IsActive == "False")      
          {
            this.isEnableOrDisable = true;
          }
          else
          {
            this.isEnableOrDisable = false;
          }

    }


  ngOnInit() {

    //this.taskObj = new TaskDetals();

    if(this.id > 0){
        // this._taskService.getTaskById(this.id)
        //   .subscribe(resp => this.taskDetailForm.setValue(resp)
        //            , error => this.errorMessage = error);
          

        this._taskService.getTaskById(this.id)
          .subscribe(resp => this.taskObj = resp
                   , error => this.errorMessage = error,
                   () => this.bindingwithobject(this.taskObj)                   
                   );    

          
    }

    
  }

  get TaskName() { return this.taskDetailForm.get('TaskName'); }  
  get StartDate() { return this.taskDetailForm.get('StartDate'); }  
  get EndDate() { return this.taskDetailForm.get('EndDate'); }  
  get Priority() { return this.taskDetailForm.get('Priority'); }  

}
