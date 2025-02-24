import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { InventorySearchComponent } from './inventory-search.component';
import { InventoryService } from '../inventory.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('InventorySearchComponent', () => {
  let component: InventorySearchComponent;
  let fixture: ComponentFixture<InventorySearchComponent>;
  let inventoryService: InventoryService;
  let router: Router;
  let mockInventoryService: jasmine.SpyObj<InventoryService>;

  beforeEach(async () => {
    mockInventoryService = jasmine.createSpyObj('InventoryService', ['getInventory', 'searchInventory']);

    // Mock return value for getInventory
    mockInventoryService.getInventory.and.returnValue(of([]));
    mockInventoryService.searchInventory.and.returnValue(of());



    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, InventorySearchComponent, ReactiveFormsModule, RouterTestingModule],
      providers: [
        { provide: InventoryService, useValue: mockInventoryService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InventorySearchComponent);
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

  it('should handle error on form submission failure', () => {
    mockInventoryService.searchInventory.and.returnValue(throwError(() => new Error('Error updating Item'))); // Modify existing spy
    spyOn(console, 'error');

    component.itemForm.controls['_id'].setValue('650c1f1e1c9d440000a1c3d2');
    component.itemForm.controls['supplierId'].setValue(1);
    component.itemForm.controls['name'].setValue('Item');
    component.itemForm.controls['description'].setValue('Description test');
    component.itemForm.controls['quantity'].setValue(10);
    component.itemForm.controls['price'].setValue(10.00);
    component.itemForm.controls['dateModified'].setValue('2025-02-17T00:00');

    component.onSubmit();

    expect(mockInventoryService.searchInventory).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Error occurred while finding inventory with that name');
  });

});
