import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Team } from '../models/Team';

@Injectable({
  providedIn: 'root'
})
export class TeamMembersService {
  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(environment.api_base_url + 'team-members')
      .pipe(catchError((x) => { throw 'Get Team-meambers Error occurred' }))
  }
  
  constructor(private http: HttpClient) { }
}
