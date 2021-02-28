import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StdAddToClassComponent } from './std-add-to-class.component';

describe('StdAddToClassComponent', () => {
  let component: StdAddToClassComponent;
  let fixture: ComponentFixture<StdAddToClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StdAddToClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StdAddToClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
