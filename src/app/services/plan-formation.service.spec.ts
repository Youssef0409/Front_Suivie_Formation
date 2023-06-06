import { TestBed } from '@angular/core/testing';

import { PlanFormationService } from './plan-formation.service';

describe('PlanFormationService', () => {
  let service: PlanFormationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanFormationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
