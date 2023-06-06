import { TestBed } from '@angular/core/testing';

import { FormationserviceService } from './formationservice.service';

describe('FormationserviceService', () => {
  let service: FormationserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormationserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
