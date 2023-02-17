import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/Category';
import { CategorieService } from 'src/app/services/category.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit, OnDestroy {

  catagoriesList: Category[] | undefined;
  catagoriesListSubscription: Subscription | undefined;
  taskFormGroup = new FormGroup({
    name: new FormControl('New Task', [Validators.required]),
    categoryId: new FormControl('')
  })
  constructor(private route: ActivatedRoute, private router: Router, private _service: CategorieService, private _task: TaskService) {
  }

  ngOnInit(): void {
    let id = this.route.snapshot.queryParamMap.get('categoryId');
    if (id) {
      this.catagoriesListSubscription = this._service.getAllCategories().subscribe(res => {
        this.catagoriesList = res;
        this.taskFormGroup.controls['categoryId'].setValue(id)
      }
      )
    }
  }
  onSubmit() {
    let categoryId = this.taskFormGroup.controls['categoryId'].value
    let name = this.taskFormGroup.controls['name'].value
    if (categoryId && name) {
      this._task.createTask({ categoryId, name })
      .subscribe(res => this.router.navigate(['/', 'categories', categoryId]))
    }
  }
  ngOnDestroy() {
    if (!!this.catagoriesListSubscription)
      this.catagoriesListSubscription.unsubscribe()
  }
}
