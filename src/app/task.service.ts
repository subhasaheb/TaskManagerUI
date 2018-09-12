import { Injectable } from '@angular/core';
import {Http,Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


// import { Injectable } from '@angular/core';
// import { Http, Response} from '@angular/http';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
//import 'rxjs/Rx';
// import 'rxjs/add/operator/map'
// import { map } from 'rxjs/operators';
import {TaskDetals} from './Models/TaskDetail';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

//Test
taskObj: TaskDetals;
  baseUrl: string = 'http://localhost:56173/api/Task/'
  
    constructor(private _http: Http) { }

    getTaskList(){
      // return this._http.get(this.baseUrl + 'GetTask')
      //           .map((response: Response) =>response.json())
      //           .catch(this._errorHandler);

       return this._http.get(this.baseUrl + 'GetTask')
    .map((response:Response)=><TaskDetals[]>response.json())
  }

  getTaskById(id){
      return this._http.get(this.baseUrl +"GetTaskId/"+ id)
              .map((response: Response) => <TaskDetals>response.json())
              .catch(this._errorHandler)
    }

    saveTask(task){
      return this._http.post(this.baseUrl +   'SaveTask', task)
              .map((response: Response) => response.json())
              .catch(this._errorHandler)
    }

    endTask(id){
      return this._http.delete(this.baseUrl +   'EndTask/' + id)
              .map((response: Response) => response.json())
              .catch(this._errorHandler)
    }
  
  // GetAll():Observable<TaskDetals[]>
  // {
  //   return this._http.get(this.baseUrl + 'GetTask')
  //   .map((response:Response)=><TaskDetals[]>response.json())
  // }

    _errorHandler(error:Response){
      debugger;
      console.log(error);
      return Observable.throw(error || "Internal server error");
    }
}
