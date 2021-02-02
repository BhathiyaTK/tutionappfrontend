import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TchrClassTabsComponent } from './tchr-class-tabs.component';

describe('TchrClassTabsComponent', () => {
  let component: TchrClassTabsComponent;
  let fixture: ComponentFixture<TchrClassTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TchrClassTabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TchrClassTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
