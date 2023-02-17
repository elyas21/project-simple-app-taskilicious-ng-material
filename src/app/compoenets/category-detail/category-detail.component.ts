import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { Category } from 'src/app/models/Category';
import { CategorieService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit, OnDestroy {
  category: Category | undefined;
  detailSubscripition: Subscription | undefined;

  constructor(private _activated: ActivatedRoute,private _router: Router, private _service: CategorieService) { }

  ngOnInit(): void {
   this.detailSubscripition = this._activated.params.pipe(
      switchMap((res: any) => {
        return this._service.getCategoryById(res.id);
      })
    ).subscribe((res :Category)=> {
      this.category = res;
    })
  }
  ngOnDestroy(): void {
    this.detailSubscripition?.unsubscribe()
  }
}
