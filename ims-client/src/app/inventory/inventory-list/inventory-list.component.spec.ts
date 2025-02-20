import { InventoryService } from '../inventory.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InventoryListComponent } from './inventory-list.component';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';

describe('InventoryListComponent', () => {
  let component: InventoryListComponent;
  let fixture: ComponentFixture<InventoryListComponent>;
  let inventoryService: InventoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        InventoryListComponent,
        HttpClientTestingModule,
        CommonModule],
      providers: [InventoryService]
    })
    .compileComponents();

    inventoryService = TestBed.inject(InventoryService);

    fixture = TestBed.createComponent(InventoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(()=>{
    fixture = TestBed.createComponent(InventoryListComponent);
    component = fixture.componentInstance;
  });

  // ✅ Test 1: Should create the component
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // ✅ Test 2: Should fetch inventory list
  it('should fetch inventory list', () => {
    const mockInventory = [{ name: 'Item A', price: 100 }];

    // Mock the service to return the mock inventory
    spyOn(InventoryService, 'getInventory').and.returnValue(of(mockInventory));

    // Trigger change detection to update the component
    fixture.detectChanges();

    // Check if inventory is populated correctly
    expect(component.inventoryItems.length).toBe(1);  // Ensure inventory has one item
    expect(component.inventoryItems[0].name).toBe('Item A'); // Ensure the first item's name is 'Item A'
  });
});
