import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StdClassTabsComponent } from './std-class-tabs.component';

describe('StdClassTabsComponent', () => {
  let component: StdClassTabsComponent;
  let fixture: ComponentFixture<StdClassTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StdClassTabsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StdClassTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
