import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryCreateComponent } from './compoenets/category-create/category-create.component';
import { CategoryEditComponent } from './compoenets/category-edit/category-edit.component';
import { CategoryListComponent } from './compoenets/category-list/category-list.component';

const route: Routes = [
  { path: '', component: CategoryListComponent },
  { path: 'categories/create', component: CategoryCreateComponent },
  { path: 'categories/edit/:id', component: CategoryEditComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(route)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
