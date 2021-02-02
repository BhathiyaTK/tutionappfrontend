import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBioInfoComponent } from './update-bio-info.component';

describe('UpdateBioInfoComponent', () => {
  let component: UpdateBioInfoComponent;
  let fixture: ComponentFixture<UpdateBioInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateBioInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBioInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
