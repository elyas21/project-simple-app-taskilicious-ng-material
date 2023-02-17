import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, map, Observable, Subject, switchMap, tap } from 'rxjs';
import { Category } from 'src/app/models/Category';
import { CategorieService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

  options: string[] = ['A-Z', 'Z-A']
  selected = new FormControl()

  categoryListSubject$ = new BehaviorSubject<Category[]>([])
  categoryList$: Category[] | undefined


  /**
   * @param _service 
   */
  constructor(private _service: CategorieService) {

    this.selected.valueChanges.subscribe(x => {
      if (!!this.categoryList$)
        if (x === 'A-Z')
          this.categoryListSubject$.next(this.categoryList$.sort(
            (a: Category, b: Category) => a.name > b.name ? 1 : -1))
        else {
          this.categoryListSubject$.next(this.categoryList$.sort(
            (a: Category, b: Category) => a.name > b.name ? -1 : 1))
        }
    })
  }

  /*
    Catagories will load from api when the component is initialized and filter only first Ten categories.
    Then categoryList will be used directly in the template using Async Pipe.
  */
  ngOnInit(): void {
    this._service.getAllCategories().pipe(map((x: Category[]) => x.slice(0, 10))).subscribe(res => {
      this.categoryListSubject$.next(res)
      this.selected.setValue('A-Z')
    })
    this.categoryListSubject$.subscribe(x => this.categoryList$ = x)
  }

}
