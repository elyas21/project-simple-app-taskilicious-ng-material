import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Category } from 'src/app/models/Category';
import { CategorieService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  categoryList$: Observable<Category[]> | undefined;

  constructor(private _service: CategorieService) { }
  
  /*
    Catagories will load from api when the component is initialized and filter only first Ten categories.
    Then categoryList will be used directly in the template using Async Pipe.
  */
  ngOnInit(): void {
    this.categoryList$ = this._service.getAllCategories().pipe(map((x: Category[]) => x.slice(0, 10)))
  }

}
