import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { InventoryService } from '../inventory.service';
import { RouterTestingModule } from '@angular/router/testing';
import { InventoryAddComponent } from './inventory-add.component';
import { AddInventoryDTO } from '../../inventory/inventory';

describe('InventoryAddComponent', () => {
  let component: InventoryAddComponent;
  let fixture: ComponentFixture<InventoryAddComponent>;
  let inventoryService: InventoryService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        InventoryAddComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InventoryAddComponent);
    component = fixture.componentInstance;
    inventoryService = TestBed.inject(InventoryService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form when all fields are filled in correctly', () => {
    component.inventoryForm.controls['categoryId'].setValue(1);
    component.inventoryForm.controls['supplierId'].setValue(1);
    component.inventoryForm.controls['name'].setValue('Item 1');
    component.inventoryForm.controls['description'].setValue('Description test');
    component.inventoryForm.controls['quantity'].setValue(10);
    component.inventoryForm.controls['price'].setValue(10.00);
    component.inventoryForm.controls['dateCreated'].setValue('2025-02-17T00:00');
    expect(component.inventoryForm.valid).toBeTrue();
  });

  it('should call addInventoryItem and navigate on successful form submission', () => {
    const dateCreated = new Date().toISOString();

    const addInventorySchema: AddInventoryDTO = {
      supplierId: 2,
      categoryId: 1,
      name: 'test',
      description: 'test description',
      quantity: 10,
      price: 10.00,
      dateCreated: dateCreated,
    };
    const mockInventoryItem = {
      _id: '650c1f1e1c9d440000a1c3d2',
      ...addInventorySchema,
    };

    spyOn(inventoryService, 'addInventoryItem').and.returnValue(of(mockInventoryItem));
    spyOn(router, 'navigate');

    component.inventoryForm.controls['categoryId'].setValue(addInventorySchema.categoryId);
    component.inventoryForm.controls['supplierId'].setValue(addInventorySchema.supplierId);
    component.inventoryForm.controls['name'].setValue(addInventorySchema.name);
    component.inventoryForm.controls['description'].setValue(addInventorySchema.description);
    component.inventoryForm.controls['quantity'].setValue(addInventorySchema.quantity);
    component.inventoryForm.controls['price'].setValue(addInventorySchema.price);
    component.inventoryForm.controls['dateCreated'].setValue(addInventorySchema.dateCreated);
    component.onSubmit();

    expect(inventoryService.addInventoryItem).toHaveBeenCalledWith(addInventorySchema);
    expect(router.navigate).toHaveBeenCalledWith(['/inventory/create']);
  });

  it('should handle error on form submission failure', () => {
    spyOn(inventoryService, 'addInventoryItem').and.returnValue(throwError(() => new Error('Error adding item')));
    spyOn(console, 'error');

    component.inventoryForm.controls['categoryId'].setValue(1);
    component.inventoryForm.controls['supplierId'].setValue(1);
    component.inventoryForm.controls['name'].setValue('Item 1');
    component.inventoryForm.controls['description'].setValue('Description test');
    component.inventoryForm.controls['quantity'].setValue(10);
    component.inventoryForm.controls['price'].setValue(10.00);
    component.inventoryForm.controls['dateCreated'].setValue('2025-02-17T00:00');

    component.onSubmit();

    expect(inventoryService.addInventoryItem).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(new Error('Error adding item'));
  });
});
