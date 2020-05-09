import {TestBed} from '@angular/core/testing';

import {ExpenseStorageService} from './expense-storage.service';

describe('ExpenseStorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExpenseStorageService = TestBed.get(ExpenseStorageService);
    expect(service).toBeTruthy();
  });
});
