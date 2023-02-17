import { TestBed } from '@angular/core/testing';

import { CategorieService } from './category.service';

describe('CategorieService', () => {
  let service: CategorieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategorieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
