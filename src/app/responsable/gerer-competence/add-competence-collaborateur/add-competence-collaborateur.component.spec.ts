import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompetenceCollaborateurComponent } from './add-competence-collaborateur.component';

describe('AddCompetenceCollaborateurComponent', () => {
  let component: AddCompetenceCollaborateurComponent;
  let fixture: ComponentFixture<AddCompetenceCollaborateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCompetenceCollaborateurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCompetenceCollaborateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
