import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/Category';
import { CategorieService } from 'src/app/services/category.service';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.scss']
})
export class ListCardComponent implements OnInit {

  @Input() CategoryObject :Category | undefined;

  constructor(private _service: CategorieService) { }

  ngOnInit(): void {
  }

}
