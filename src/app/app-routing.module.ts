import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryCreateComponent } from './compoenets/category-create/category-create.component';
import { CategoryDetailComponent } from './compoenets/category-detail/category-detail.component';
import { CategoryEditComponent } from './compoenets/category-edit/category-edit.component';
import { CategoryListComponent } from './compoenets/category-list/category-list.component';
import { TaskCreateComponent } from './compoenets/task-create/task-create.component';
import { TaskEditComponent } from './compoenets/task-edit/task-edit.component';

const route: Routes = [
  { path: '', component: CategoryListComponent },
  { path: 'categories/create', component: CategoryCreateComponent },
  { path: 'categories/edit/:id', component: CategoryEditComponent },
  { path: 'categories/:id', component: CategoryDetailComponent },
  { path: 'task/create', component: TaskCreateComponent },
  { path: 'tasks/edit/:id', component: TaskEditComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(route)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
