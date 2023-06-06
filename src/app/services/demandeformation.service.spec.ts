import { TestBed } from '@angular/core/testing';

import { DemandeformationService } from './demandeformation.service';

describe('DemandeformationService', () => {
  let service: DemandeformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DemandeformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
