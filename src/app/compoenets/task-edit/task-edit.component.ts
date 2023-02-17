import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { of, Subscription, switchMap } from 'rxjs';
import { Category } from 'src/app/models/Category';
import { CategorieService } from 'src/app/services/category.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {
  taskId:string | undefined | null;
  catagoriesList: Category[] | undefined;
  catagoriesListSubscription: Subscription | undefined;
  taskFormGroup = new FormGroup({
    name: new FormControl('New Task', [Validators.required]),
    categoryId: new FormControl(''),
    id: new FormControl('')
  })
  constructor(private route: ActivatedRoute, private router: Router, private _service: CategorieService, private _task: TaskService) {
  }
  ngOnInit(): void {
    this.catagoriesListSubscription = this._service.getAllCategories().subscribe(res => {
      this.catagoriesList = res;
    }
    )
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        this.taskId = params.get('id')
        return this._task.getTaskByID(params.get('id'))
      })
    ).subscribe(res => {
      if(!!this.taskId)
      this.taskFormGroup.setValue({ name: res?.name, categoryId: res.categoryId , id:this.taskId })
    });
    
  }
  onSubmit(){
    let categoryId = this.taskFormGroup.controls['categoryId'].value
    let name = this.taskFormGroup.controls['name'].value
    if (categoryId && name && this.taskId) {
      this._task.updateTask({ categoryId, name ,id:this.taskId})
      .subscribe(res => this.router.navigate(['/', 'categories', categoryId]))
    }    
  }

}
