import { TestBed } from '@angular/core/testing';

import { LodashService } from './lodash.service';

describe('LodashService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LodashService = TestBed.get(LodashService);
    expect(service).toBeTruthy();
  });
});
