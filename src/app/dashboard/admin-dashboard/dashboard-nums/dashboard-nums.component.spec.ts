import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardNumsComponent } from './dashboard-nums.component';

describe('DashboardNumsComponent', () => {
  let component: DashboardNumsComponent;
  let fixture: ComponentFixture<DashboardNumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardNumsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardNumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
