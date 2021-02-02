import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUserStatusComponent } from './show-user-status.component';

describe('ShowUserStatusComponent', () => {
  let component: ShowUserStatusComponent;
  let fixture: ComponentFixture<ShowUserStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowUserStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowUserStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
