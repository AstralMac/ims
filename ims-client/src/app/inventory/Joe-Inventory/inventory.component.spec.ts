import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InventoryComponent } from './inventory.component'; // Import the standalone component
import { InventoryService } from '../inventory.service'; // Ensure this service is imported
import { CommonModule } from '@angular/common'; // Import CommonModule for ngForOf
import { of } from 'rxjs';

describe('InventoryComponent', () => {
  let inventoryService: InventoryService;
  let fixture: ComponentFixture<InventoryComponent>;
  let component: InventoryComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        InventoryComponent,            // Standalone component
        HttpClientTestingModule,       // For HTTP requests in tests
        CommonModule                  // Include CommonModule to recognize ngForOf directive
      ],
      providers: [InventoryService]     // Provide InventoryService
    }).compileComponents();

    inventoryService = TestBed.inject(InventoryService); // Inject the inventory service
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryComponent);
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
    spyOn(inventoryService, 'getInventory').and.returnValue(of(mockInventory));

    // Trigger change detection to update the component
    fixture.detectChanges();

    // Check if inventory is populated correctly
    expect(component.inventoryItems.length).toBe(1);  // Ensure inventory has one item
    expect(component.inventoryItems[0].name).toBe('Item A'); // Ensure the first item's name is 'Item A'
  });
});
