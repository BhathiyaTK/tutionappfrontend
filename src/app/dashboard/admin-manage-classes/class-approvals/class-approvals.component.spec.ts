import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassApprovalsComponent } from './class-approvals.component';

describe('ClassApprovalsComponent', () => {
  let component: ClassApprovalsComponent;
  let fixture: ComponentFixture<ClassApprovalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassApprovalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassApprovalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
