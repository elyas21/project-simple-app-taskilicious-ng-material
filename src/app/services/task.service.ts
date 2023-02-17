import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from '../models/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  removeTask(id:string):Observable<any> {
    return this.http.delete<Task>(environment.api_base_url + 'tasks/'+id)
      .pipe(catchError((x) => { throw 'Delete Error occurred' }))
  }

  createTask(task: Task): Observable<any> {
    return this.http.post<Task>(environment.api_base_url + 'tasks', task)
      .pipe(catchError((x) => { throw 'Create  Error occurred' }))
  }

  constructor(private http: HttpClient) { }
}
