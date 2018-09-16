//import { TestBed, inject } from '@angular/core/testing';
import {  TestBed,  getTestBed,  async,  inject} from '@angular/core/testing';
import {Headers, BaseRequestOptions, Response, HttpModule, Http, XHRBackend, RequestMethod} from '@angular/http';
import {ResponseOptions} from '@angular/http';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {TaskDetals} from './Models/TaskDetail';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let mockBackend: MockBackend;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        TaskService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory:
            (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
              return new Http(backend, defaultOptions);
            }
       }
      ],
      imports: [
        HttpModule
      ]
    });
    mockBackend = getTestBed().get(MockBackend);
  }));


it('should get tasks', done => {
    let taskService: TaskService;

    getTestBed().compileComponents().then(() => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {
          connection.mockRespond(new Response(
            new ResponseOptions({
                body: [
                  {
                    TaskID:1,
                    TaskName:"Task1",
                    StartDate: "11/11/11",
                    EndDate:"11/11/11",
                    ParentTaskName : "parent Task1",
                    Priority: 20,
                    IsActive:"yes"                    
                  }]
              }
            )));
        });

        taskService = getTestBed().get(TaskService);
        expect(taskService).toBeDefined();

        taskService.getTaskList().subscribe((taskslist: TaskDetals[]) => {
            expect(taskslist.length).toBeDefined();
            expect(taskslist.length).toEqual(1);
            expect(taskslist[0].TaskID).toEqual(1);
            done();
        });
    });
  });


  it('should fetch a task by task id',
    async(inject([TaskService], (taskService) => {
      mockBackend.connections.subscribe(
        (connection: MockConnection) => {

          // make sure the URL is correct
          expect(connection.request.url).toMatch(/\/localhost:56173\/api\/Task\/GetTaskId\/1/);
          connection.mockRespond(
            new Response(
              new ResponseOptions({
                body: {
                   TaskID:1,
                    TaskName:"Task1",
                    StartDate: "11/11/11",
                    EndDate:"11/11/11",
                    ParentTaskName : "parent Task1",
                    Priority: 20,
                    IsActive:"yes"  
                }
              }))
          );
        }
      );

      taskService.getTaskById(1).subscribe(
        (taskEntry) => {
          expect(taskEntry.TaskID).toBe(1);
          expect(taskEntry.TaskName).toBe("Task1");
          // expect(blogEntry.contentMarkdown).toBe('*Demo*');
          // expect(blogEntry.contentRendered).toBe('<p><b>Demo</b></p>')
        }
      );
  })));

  it('should insert new task entries',
    async(inject([TaskService], (taskService) => {
      mockBackend.connections.subscribe((connection: MockConnection) => {
        // is it the correct REST type for an insert? (POST)
        expect(connection.request.method).toBe(RequestMethod.Post);
        // okey dokey,
        connection.mockRespond(new Response(new ResponseOptions({status: 201})));
      });

      let data: TaskDetals = new TaskDetals();
      data.EndDate = new Date("11/11/11");  
      data.StartDate = new Date("11/11/11");  
      data.IsActive = "Yes";
      data.ParentTaskName = "Parent Task";
      data.Priority = 25;
      
     
      taskService.saveTask(data).subscribe(
        (successResult) => {
          expect(successResult).toBeDefined();
          //expect(successResult.ta).toBe(201);
        });
    })));


 
});
