import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Leftsidebar } from './leftsidebar';

describe('Leftsidebar', () => {
  let component: Leftsidebar;
  let fixture: ComponentFixture<Leftsidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Leftsidebar],
    }).compileComponents();

    fixture = TestBed.createComponent(Leftsidebar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
