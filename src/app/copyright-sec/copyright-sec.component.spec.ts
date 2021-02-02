import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopyrightSecComponent } from './copyright-sec.component';

describe('CopyrightSecComponent', () => {
  let component: CopyrightSecComponent;
  let fixture: ComponentFixture<CopyrightSecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CopyrightSecComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CopyrightSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
