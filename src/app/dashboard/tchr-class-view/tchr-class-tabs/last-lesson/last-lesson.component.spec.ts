import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastLessonComponent } from './last-lesson.component';

describe('LastLessonComponent', () => {
  let component: LastLessonComponent;
  let fixture: ComponentFixture<LastLessonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastLessonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LastLessonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
