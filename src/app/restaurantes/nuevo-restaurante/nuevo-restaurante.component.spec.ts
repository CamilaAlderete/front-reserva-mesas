import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoRestauranteComponent } from './nuevo-restaurante.component';

describe('NuevoRestauranteComponent', () => {
  let component: NuevoRestauranteComponent;
  let fixture: ComponentFixture<NuevoRestauranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevoRestauranteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoRestauranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
