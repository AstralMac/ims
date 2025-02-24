import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { InventoryByIdComponent } from './inventory-by-id.component';
import { InventoryService } from '../inventory.service';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('InventoryByIdComponent', () => {
  let component: InventoryByIdComponent;
  let fixture: ComponentFixture<InventoryByIdComponent>;
  let inventoryService: InventoryService;
  let router: Router;
  let mockInventoryService: jasmine.SpyObj<InventoryService>;

  beforeEach(async () => {
    mockInventoryService = jasmine.createSpyObj('InventoryService', ['getInventory', 'getInventoryById']);

    // Mock return value for getInventory
    mockInventoryService.getInventory.and.returnValue(of([]));
    mockInventoryService.getInventoryById.and.returnValue(of());

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule, CommonModule, FormsModule, InventoryByIdComponent],
      providers: [
        { provide: InventoryService, useValue: mockInventoryService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InventoryByIdComponent);
    component = fixture.componentInstance;
    inventoryService = TestBed.inject(InventoryService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form when all fields are filled in correctly', () => {
    component.itemForm.controls['_id'].setValue('650c1f1e1c9d440000a1c3d2');
    component.itemForm.controls['supplierId'].setValue(1);
    component.itemForm.controls['name'].setValue('Item 1');
    component.itemForm.controls['description'].setValue('Description test');
    component.itemForm.controls['quantity'].setValue(10);
    component.itemForm.controls['price'].setValue(10.00);
    component.itemForm.controls['dateModified'].setValue('2025-02-17T00:00');
    expect(component.itemForm.valid).toBeTrue();
  });

  it('should handle error when inventory item is not found', () => {
    mockInventoryService.getInventoryById.and.returnValue(throwError(() => new Error('Item not found')));
    spyOn(console, 'error');

    component.itemForm.controls['_id'].setValue('650c1f1e1c9d440000a1c3d2');
    component.onSubmit();

    expect(mockInventoryService.getInventoryById).toHaveBeenCalledWith('650c1f1e1c9d440000a1c3d2');
    expect(console.error).toHaveBeenCalledWith('Error occurred while finding inventory item with ID 650c1f1e1c9d440000a1c3d2: Error: Item not found');
  });

  it('should display inventory items after successful retrieval by ID', () => {
    const mockInventoryItems = {
      _id: '650c1f1e1c9d440000a1c3d2',
      name: 'Item 1',
      quantity: 10,
      description: 'Description',
      dateCreated: '2025-02-17T00:00' };

    mockInventoryService.getInventoryById.and.returnValue(of(mockInventoryItems));

    component.itemForm.controls['_id'].setValue('650c1f1e1c9d440000a1c3d2');
    component.onSubmit();

    expect(mockInventoryService.getInventoryById).toHaveBeenCalledWith('650c1f1e1c9d440000a1c3d2');
    expect(component.isTableVisible).toBeTrue();
    expect(component.inventoryItems).toEqual([]);
  });
});
