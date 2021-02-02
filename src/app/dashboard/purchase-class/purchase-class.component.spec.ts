import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseClassComponent } from './purchase-class.component';

describe('PurchaseClassComponent', () => {
  let component: PurchaseClassComponent;
  let fixture: ComponentFixture<PurchaseClassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseClassComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
