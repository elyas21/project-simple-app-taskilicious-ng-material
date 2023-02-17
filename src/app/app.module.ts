import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


import { AppComponent } from './app.component';
import { CategoryListComponent } from './compoenets/category-list/category-list.component';
import { ListCardComponent } from './compoenets/category-list/list-card/list-card.component';
import { CategoryCreateComponent } from './compoenets/category-create/category-create.component';
import { CategoryEditComponent } from './compoenets/category-edit/category-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    ListCardComponent,
    CategoryListComponent,
    CategoryCreateComponent,
    CategoryEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,

    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
