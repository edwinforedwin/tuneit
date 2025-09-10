import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Userhome } from './userhome';

describe('Userhome', () => {
  let component: Userhome;
  let fixture: ComponentFixture<Userhome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Userhome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Userhome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
