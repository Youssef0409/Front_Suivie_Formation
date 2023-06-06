import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListedemandeComponent } from './listedemande.component';

describe('ListedemandeComponent', () => {
  let component: ListedemandeComponent;
  let fixture: ComponentFixture<ListedemandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListedemandeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListedemandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
