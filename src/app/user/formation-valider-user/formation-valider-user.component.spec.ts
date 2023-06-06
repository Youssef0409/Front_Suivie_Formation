import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationValiderUserComponent } from './formation-valider-user.component';

describe('FormationValiderUserComponent', () => {
  let component: FormationValiderUserComponent;
  let fixture: ComponentFixture<FormationValiderUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormationValiderUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormationValiderUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
