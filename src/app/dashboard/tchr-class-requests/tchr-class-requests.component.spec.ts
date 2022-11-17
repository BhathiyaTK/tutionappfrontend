import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TchrClassRequestsComponent } from './tchr-class-requests.component';

describe('TchrClassRequestsComponent', () => {
  let component: TchrClassRequestsComponent;
  let fixture: ComponentFixture<TchrClassRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TchrClassRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TchrClassRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
