import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherCreateClassComponent } from './teacher-create-class.component';

describe('TeacherCreateClassComponent', () => {
  let component: TeacherCreateClassComponent;
  let fixture: ComponentFixture<TeacherCreateClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherCreateClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherCreateClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
