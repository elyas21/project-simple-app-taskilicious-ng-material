import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  constructor(private http: HttpClient) { }

  /*
  Get Categories from api. Base url came from environment variables.
  */
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(environment.api_base_url + 'categories')
      .pipe(catchError((x) => { throw 'Post Error occurred' }))
  }
  /*
Post Categories to api. Base url came from environment variables.
*/
  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(environment.api_base_url + 'categories', category)
      .pipe(catchError((x) => { throw 'Post Error occurred' }))
  }
}
