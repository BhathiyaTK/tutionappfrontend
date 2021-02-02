import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TchrClassViewComponent } from './tchr-class-view.component';

describe('TchrClassViewComponent', () => {
  let component: TchrClassViewComponent;
  let fixture: ComponentFixture<TchrClassViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TchrClassViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TchrClassViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
