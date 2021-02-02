import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TchrClassSummeryComponent } from './tchr-class-summery.component';

describe('TchrClassSummeryComponent', () => {
  let component: TchrClassSummeryComponent;
  let fixture: ComponentFixture<TchrClassSummeryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TchrClassSummeryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TchrClassSummeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
