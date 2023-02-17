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
   Put  Categories to api. Base url came from environment variables.
   */
  putCatagory(data: Category) {
    return this.http.put<Category>(environment.api_base_url + 'categories/' + data.id, data)
      .pipe(catchError((x) => { throw 'Get By ID Error occurred' }))
  }

  /*
  Get Category by ID from api. Base url came from environment variables.
  */
  getCategoryById(id: any): Observable<Category> {
    return this.http.get<Category>(environment.api_base_url + 'categories/' + id)
      .pipe(catchError((x) => { throw 'Get By ID Error occurred' }))
  }

  /*
  Get Categories from api. Base url came from environment variables.
  */
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(environment.api_base_url + 'categories')
      .pipe(catchError((x) => { throw 'Get All Categories Error occurred' }))
  }
  /*
  Post Categories to api. Base url came from environment variables.
  */
  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(environment.api_base_url + 'categories', category)
      .pipe(catchError((x) => { throw 'Post Error occurred' }))
  }
}
