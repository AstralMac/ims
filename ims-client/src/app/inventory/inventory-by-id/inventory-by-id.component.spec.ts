import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryByIdComponent } from './inventory-by-id.component';

describe('InventoryByIdComponent', () => {
  let component: InventoryByIdComponent;
  let fixture: ComponentFixture<InventoryByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryByIdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
