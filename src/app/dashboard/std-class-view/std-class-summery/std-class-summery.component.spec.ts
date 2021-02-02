import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StdClassSummeryComponent } from './std-class-summery.component';

describe('StdClassSummeryComponent', () => {
  let component: StdClassSummeryComponent;
  let fixture: ComponentFixture<StdClassSummeryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StdClassSummeryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StdClassSummeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
