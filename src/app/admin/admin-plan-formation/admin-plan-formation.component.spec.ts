import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPlanFormationComponent } from './admin-plan-formation.component';

describe('AdminPlanFormationComponent', () => {
  let component: AdminPlanFormationComponent;
  let fixture: ComponentFixture<AdminPlanFormationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPlanFormationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPlanFormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
