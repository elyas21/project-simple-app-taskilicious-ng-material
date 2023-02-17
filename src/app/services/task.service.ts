import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from '../models/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  updateTask(data: Task):Observable<any> {
    return this.http.put<Task>(environment.api_base_url + 'tasks/'+data.id, data)
      .pipe(catchError((x) => { throw 'Update  Task Error occurred' }))
  }
  getTaskByID(id: string | null): Observable<Task> {
    return this.http.get<Task>(environment.api_base_url + 'tasks/'+id)
      .pipe(catchError((x) => { throw 'Get Task Error occurred' }))
  }
  removeTask(id:string):Observable<any> {
    return this.http.delete<Task>(environment.api_base_url + 'tasks/'+id)
      .pipe(catchError((x) => { throw 'Delete  Task Error occurred' }))
  }

  createTask(task: Task): Observable<any> {
    return this.http.post<Task>(environment.api_base_url + 'tasks', task)
      .pipe(catchError((x) => { throw 'Create  Task Error occurred' }))
  }

  constructor(private http: HttpClient) { }
}
