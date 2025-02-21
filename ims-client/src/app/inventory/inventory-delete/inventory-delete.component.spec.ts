import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InventoryDeleteComponent } from './inventory-delete.component';
import { InventoryService } from '../inventory.service';
import { of } from 'rxjs';
import { inventoryItems } from '../inventory'; // Ensure correct path

describe('InventoryDeleteComponent', () => {
  let component: InventoryDeleteComponent;
  let fixture: ComponentFixture<InventoryDeleteComponent>;
  let mockInventoryService: jasmine.SpyObj<InventoryService>;

  beforeEach(async () => {
    mockInventoryService = jasmine.createSpyObj('InventoryService', ['getInventory', 'deleteInventoryItem']);

    // Added missing properties to match `inventoryItems` type
    const mockInventoryData: inventoryItems[] = [
      { _id: '1', supplierId: 101, categoryId: 5, name: 'Item 1', description: 'Desc 1', quantity: 10, price: 20, dateCreated: '2025-02-17' },
      { _id: '2', supplierId: 102, categoryId: 3, name: 'Item 2', description: 'Desc 2', quantity: 5, price: 15, dateCreated: '2025-02-18' }
    ];

    mockInventoryService.getInventory.and.returnValue(of(mockInventoryData));

    // Fixed return type of `deleteInventoryItem`
    mockInventoryService.deleteInventoryItem.and.returnValue(of({}));

    await TestBed.configureTestingModule({
<<<<<<< Updated upstream
      imports: [InventoryDeleteComponent]
    })
    .compileComponents();
  let mockInventoryService: jasmine.SpyObj<InventoryService>;

  beforeEach(async () => {
    mockInventoryService = jasmine.createSpyObj('InventoryService', ['getInventory', 'deleteInventoryItem']);

    // Added missing properties to match `inventoryItems` type
    const mockInventoryData: inventoryItems[] = [
      { _id: '1', supplierId: 101, categoryId: 5, name: 'Item 1', description: 'Desc 1', quantity: 10, price: 20, dateCreated: '2025-02-17' },
      { _id: '2', supplierId: 102, categoryId: 3, name: 'Item 2', description: 'Desc 2', quantity: 5, price: 15, dateCreated: '2025-02-18' }
    ];

    mockInventoryService.getInventory.and.returnValue(of(mockInventoryData));

    // Fixed return type of `deleteInventoryItem`
    mockInventoryService.deleteInventoryItem.and.returnValue(of({}));

    await TestBed.configureTestingModule({
=======
>>>>>>> Stashed changes
      imports: [InventoryDeleteComponent],
      providers: [{ provide: InventoryService, useValue: mockInventoryService }]
    }).compileComponents();

    fixture = TestBed.createComponent(InventoryDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call deleteInventoryItem when deleteInventory is called', () => {
    spyOn(window, 'confirm').and.returnValue(true); // Mock confirmation dialog
    component.deleteInventory('1');
    expect(mockInventoryService.deleteInventoryItem).toHaveBeenCalledWith('1');
  });

  it('should remove deleted inventory item from the list', () => {
    spyOn(window, 'confirm').and.returnValue(true);

    component.deleteInventory('1');
    fixture.detectChanges();

    expect(component.inventories.length).toBe(1);
    expect(component.inventories.find(item => item._id === '1')).toBeUndefined();
  });
});
