import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { Category } from 'src/app/models/Category';
import { CategorieService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss']
})
export class CategoryEditComponent implements OnInit, OnDestroy {
  
  category: Category | undefined;
  editCategory = new FormControl('',  [Validators.required])
  updateSubscripition: Subscription | undefined;
  constructor(private _activated: ActivatedRoute,private _router: Router, private _service: CategorieService) { }

  /**
   * On this on intit method 
   * active route id will be get from activatedRoute and the observable switched to 
   * @getCategoryById() observable then the response will be assigned to form.
   */
  ngOnInit(): void {
    this._activated.params.pipe(
      switchMap((res: any) => {
        return this._service.getCategoryById(res.id);
      })
    ).subscribe((res :Category)=> {
      this.category = res;
      this.editCategory.setValue(res.name)
    })
  }
  updateCategory(){
    if(!!this.editCategory.value)
    this.updateSubscripition= this._service.putCatagory({name:this.editCategory.value, id: this.category?.id}).subscribe(res=>{
      this._router.navigate(['/'])
    })
  }
  ngOnDestroy() {
      this.updateSubscripition?.unsubscribe()
  }
}
