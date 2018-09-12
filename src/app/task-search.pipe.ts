
import {Pipe, PipeTransform} from '@angular/core';
import {TaskDetals} from './Models/TaskDetail';

@Pipe({
    name: 'taskSearch'
})

export class TaskSearchPipe implements PipeTransform {
     transform(items: Array<TaskDetals>, taskNameSearch: string, parentTaskNameSearch: string, priorityFromSearch:number,
        priorityToSearch:number, startDateSearch : string, endDateSearch: string){
        if (items && items.length){
            return items.filter(item =>{
                if (taskNameSearch && item.TaskName.toLowerCase().indexOf(taskNameSearch.toLowerCase()) === -1){
                    return false;
                }
                if (parentTaskNameSearch && item.ParentTaskName.toLowerCase().indexOf(parentTaskNameSearch.toLowerCase()) === -1){
                    return false;
                }
                if(priorityFromSearch && item.Priority < priorityFromSearch)
                {
                    return false;
                }
                if(priorityToSearch && item.Priority > priorityToSearch)
                {
                    console.log(priorityToSearch);
                    return false;
                }
                
               if(startDateSearch && item.StartDate.toString().substring(0,10) !=  startDateSearch)
               {
                   //&& item.StartDate.getDate() == startDateSearch.getDate()
                   //&& item.StartDate.toString().substring(0,10) ==  startDateSearch
                   console.log(item.StartDate.toString().substring(0,10));
                   console.log(startDateSearch);
                   return false;
               }
               if(endDateSearch && item.EndDate.toString().substring(0,10) !=  endDateSearch)
               {                  
                   return false;
               }
                return true;
           })
        }
        else{
            return items;
        }
    }
}