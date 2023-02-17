import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { Category } from 'src/app/models/Category';
import { CategorieService } from 'src/app/services/category.service';
import { TaskService } from 'src/app/services/task.service';
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
  displayedColumns: string[] = ['Name', 'CategoryId','Edit', 'Remove']
  categoryId: string | undefined;

  constructor(
    private _activated: ActivatedRoute,
    private _router: Router, private _service: CategorieService,
    private _task: TaskService
  ) { }

  ngOnInit(): void {
    this.detailSubscripition = this._activated.params.subscribe((param: any) => {
      this.categoryId = param?.id
      this._service.getCategoryById(this.categoryId).subscribe(res => {
        this.category = res
      })
      this.getTask()

    })
  }

  getTask() {
    if (!!this.categoryId)
      this._service.getAllTasks(this.categoryId).subscribe((res: any) => {
        this.dataSource = res.filter((y: Task) => y.categoryId == this.categoryId)
      })
  }
  deleteTask(task: any) {
    this._task.removeTask(task.id).subscribe(res => {
      this.getTask()
    })
  }
  ngOnDestroy(): void {
    this.detailSubscripition?.unsubscribe()
  }
}


