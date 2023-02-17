import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { CategorieService } from 'src/app/services/category.service';
import {catchError} from 'rxjs'

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent implements OnInit {

  category = new FormControl('Test' , [Validators.required])

  constructor(private _service: CategorieService, private _router: Router) { }

  ngOnInit(): void {
  }
  createCategory(){
    if(!!this.category.value){
    this._service.createCategory({name:this.category.value}).subscribe(res=>{
      this._router.navigate(['/']);
    })

  }
  }
}
