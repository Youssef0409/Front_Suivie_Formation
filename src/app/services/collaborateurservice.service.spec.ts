import { TestBed } from '@angular/core/testing';

import { CollaborateurserviceService } from './collaborateurservice.service';

describe('CollaborateurserviceService', () => {
  let service: CollaborateurserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CollaborateurserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
