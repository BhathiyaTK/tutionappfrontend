import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextClassComponent } from './next-class.component';

describe('NextClassComponent', () => {
  let component: NextClassComponent;
  let fixture: ComponentFixture<NextClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NextClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NextClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
