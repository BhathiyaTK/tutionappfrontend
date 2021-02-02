import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StdClassViewComponent } from './std-class-view.component';

describe('StdClassViewComponent', () => {
  let component: StdClassViewComponent;
  let fixture: ComponentFixture<StdClassViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StdClassViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StdClassViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
