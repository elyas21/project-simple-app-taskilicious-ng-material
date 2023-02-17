import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from '../models/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  createTask(task: Task): Observable<any> {
    return this.http.post<Task>(environment.api_base_url + 'categories', task)
      .pipe(catchError((x) => { throw 'Post Error occurred' }))
  }

  constructor(private http: HttpClient) { }
}
