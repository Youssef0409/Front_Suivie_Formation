import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeValiderComponent } from './demande-valider.component';

describe('DemandeValiderComponent', () => {
  let component: DemandeValiderComponent;
  let fixture: ComponentFixture<DemandeValiderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeValiderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeValiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
