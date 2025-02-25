import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersByIdComponent } from './suppliers-by-id.component';

describe('SuppliersByIdComponent', () => {
  let component: SuppliersByIdComponent;
  let fixture: ComponentFixture<SuppliersByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuppliersByIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppliersByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
