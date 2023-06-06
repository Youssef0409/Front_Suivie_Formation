import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GererCompetenceComponent } from './gerer-competence.component';

describe('GererCompetenceComponent', () => {
  let component: GererCompetenceComponent;
  let fixture: ComponentFixture<GererCompetenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GererCompetenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GererCompetenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
