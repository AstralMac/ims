import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { InventoryService } from '../inventory.service';
import { RouterTestingModule } from '@angular/router/testing';
import { UpdateInventoryDTO } from '../inventory';
import { InventoryUpdateComponent } from './inventory-update.component';

describe('InventoryUpdateComponent', () => {
  let component: InventoryUpdateComponent;
  let fixture: ComponentFixture<InventoryUpdateComponent>;
  let inventoryService: InventoryService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        InventoryUpdateComponent,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryUpdateComponent);
    component = fixture.componentInstance;
    inventoryService = TestBed.inject(InventoryService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a valid form when all fields are filled in correctly', () => {
    component.inventoryForm.controls['_id'].setValue('650c1f1e1c9d440000a1c3d2');
    component.inventoryForm.controls['supplierId'].setValue(1);
    component.inventoryForm.controls['name'].setValue('Item 1');
    component.inventoryForm.controls['description'].setValue('Description test');
    component.inventoryForm.controls['quantity'].setValue(10);
    component.inventoryForm.controls['price'].setValue(10.00);
    component.inventoryForm.controls['dateModified'].setValue('2025-02-17T00:00');
    expect(component.inventoryForm.valid).toBeTrue();
  });

  it('should call updateInventoryItem and navigate on successful form submission', () => {
    const dateModified = new Date().toISOString();

    const updateInventorySchema: UpdateInventoryDTO = {
      _id: '650c1f1e1c9d440000a1c3d2',
      supplierId: 2,
      name: 'test',
      description: 'test description',
      quantity: 10,
      price: 10.00,
      dateModified: dateModified,
    };

    spyOn(inventoryService, 'updateInventoryItem').and.returnValue(of(updateInventorySchema));
    spyOn(router, 'navigate');
    component.inventoryForm.controls['_id'].setValue('650c1f1e1c9d440000a1c3d2');
    component.inventoryForm.controls['supplierId'].setValue(2);
    component.inventoryForm.controls['name'].setValue('test');
    component.inventoryForm.controls['description'].setValue('test description');
    component.inventoryForm.controls['quantity'].setValue(10);
    component.inventoryForm.controls['price'].setValue(10.00);
    component.inventoryForm.controls['dateModified'].setValue(dateModified);

    component.onSubmit();

    expect(inventoryService.updateInventoryItem).toHaveBeenCalledWith(updateInventorySchema,'650c1f1e1c9d440000a1c3d2');
    expect(router.navigate).toHaveBeenCalledWith(['/inventory']);
  });

  it('should handle error on form submission failure', () => {
    spyOn(inventoryService, 'updateInventoryItem').and.returnValue(throwError(()=> new Error ('Error updating Item')));
    spyOn(console , 'error');

    component.inventoryForm.controls['_id'].setValue('650c1f1e1c9d440000a1c3d2');
    component.inventoryForm.controls['supplierId'].setValue(1);
    component.inventoryForm.controls['name'].setValue('Item');
    component.inventoryForm.controls['description'].setValue('Description test');
    component.inventoryForm.controls['quantity'].setValue(10);
    component.inventoryForm.controls['price'].setValue(10.00);
    component.inventoryForm.controls['dateModified'].setValue('2025-02-17T00:00');
    component.onSubmit();
    expect(inventoryService.updateInventoryItem).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Error updating item');
  });
});
