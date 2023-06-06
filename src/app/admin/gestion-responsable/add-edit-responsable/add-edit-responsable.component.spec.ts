import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditResponsableComponent } from './add-edit-responsable.component';

describe('AddEditResponsableComponent', () => {
  let component: AddEditResponsableComponent;
  let fixture: ComponentFixture<AddEditResponsableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditResponsableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddEditResponsableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
