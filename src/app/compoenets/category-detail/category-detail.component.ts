import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { Category } from 'src/app/models/Category';
import { CategorieService } from 'src/app/services/category.service';
import { Task } from '../../models/Task'
@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit, OnDestroy {
  dataSource: Category[] = [];
  category: Category | undefined;
  detailSubscripition: Subscription | undefined;
  displayedColumns: string[] = [ 'name','categoryId']

  constructor(private _activated: ActivatedRoute, private _router: Router, private _service: CategorieService) { }

  ngOnInit(): void {
    this.detailSubscripition = this._activated.params.subscribe((param: any) => {

      this._service.getCategoryById(param?.id).subscribe(res => {
        this.category = res
      })
      this._service.getAllTasks(param?.id).subscribe((res:any) => {
        this.dataSource = res.filter((y:Task)=>y.categoryId==param?.id)
      })

    })}
  ngOnDestroy(): void {
    this.detailSubscripition?.unsubscribe()
  }
}


