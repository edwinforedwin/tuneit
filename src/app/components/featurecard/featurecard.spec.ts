import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Featurecard } from './featurecard';

describe('Featurecard', () => {
  let component: Featurecard;
  let fixture: ComponentFixture<Featurecard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Featurecard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Featurecard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
