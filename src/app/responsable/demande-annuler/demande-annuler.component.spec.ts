import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeAnnulerComponent } from './demande-annuler.component';

describe('DemandeAnnulerComponent', () => {
  let component: DemandeAnnulerComponent;
  let fixture: ComponentFixture<DemandeAnnulerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemandeAnnulerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeAnnulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
