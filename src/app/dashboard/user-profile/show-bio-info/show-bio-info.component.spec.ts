import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowBioInfoComponent } from './show-bio-info.component';

describe('ShowBioInfoComponent', () => {
  let component: ShowBioInfoComponent;
  let fixture: ComponentFixture<ShowBioInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowBioInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowBioInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
