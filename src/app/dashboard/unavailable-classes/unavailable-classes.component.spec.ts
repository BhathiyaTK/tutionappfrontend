import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnavailableClassesComponent } from './unavailable-classes.component';

describe('UnavailableClassesComponent', () => {
  let component: UnavailableClassesComponent;
  let fixture: ComponentFixture<UnavailableClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnavailableClassesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnavailableClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
