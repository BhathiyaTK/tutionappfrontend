import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherInfoModalComponent } from './teacher-info-modal.component';

describe('TeacherInfoModalComponent', () => {
  let component: TeacherInfoModalComponent;
  let fixture: ComponentFixture<TeacherInfoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherInfoModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
