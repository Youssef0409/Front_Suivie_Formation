import { TestBed } from '@angular/core/testing';

import { CompetenceserviceService } from './competenceservice.service';

describe('CompetenceserviceService', () => {
  let service: CompetenceserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompetenceserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
