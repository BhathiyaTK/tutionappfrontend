import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinedClassesComponent } from './joined-classes.component';

describe('JoinedClassesComponent', () => {
  let component: JoinedClassesComponent;
  let fixture: ComponentFixture<JoinedClassesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JoinedClassesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JoinedClassesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
