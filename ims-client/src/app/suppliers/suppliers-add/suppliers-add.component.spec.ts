import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router'
import { HttpClientTestingModule, provideHttpClientTesting } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { InventoryAddComponent } from '../../inventory/inventory-add/inventory-add.component';
import { AddSuppliersDTO } from '../../suppliers/suppliers';

import { SuppliersAddComponent } from './suppliers-add.component';
import { SuppliersService } from '../suppliers.service';
import { AddInventoryDTO } from '../../inventory/inventory';

describe('SuppliersAddComponent', () => {
  let component: SuppliersAddComponent;
  let fixture: ComponentFixture<SuppliersAddComponent>;
  let suppliersService: SuppliersService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
  
      imports: [
        SuppliersAddComponent,
        ReactiveFormsModule,
        HttpClientTestingModule,
        SuppliersAddComponent
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppliersAddComponent);
    component = fixture.componentInstance;
    suppliersService = TestBed.inject(SuppliersService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should have a valid form when all fields are filled in and validated', () => {
    component.supplierForm.controls['supplierID'].setValue(1);
    component.supplierForm.controls['supplierName'].setValue('Jakes Gadgets');
    component.supplierForm.controls['supplierContact'].setValue('715-299-9999');
    component.supplierForm.controls['supplierAddress'].setValue('123 Best Stuff Way');
    component.supplierForm.controls['dateCreated'].setValue('2025-02-25T00:00');
    expect(component.supplierForm.valid).toBeTrue();
  });

  it('Should call addSupplier and navigate on successful form submission', () => {
    const dateCreated = new Date().toISOString();

    const addSupplierSchema: AddSuppliersDTO = {
      supplierId: 1,
      supplierName: 'Test',
      contactInformation: '715-299-9999',
      address: '123 Best Gadget Way',
      dateCreated: '2025-02-25T00:00'
    };

    const mockInventoryItem = {
      _id: '650c1f1e1c9d440000a1c3d2',
      ...addSupplierSchema,
    };
    component.supplierForm.controls['supplierId'].setValue(addSupplierSchema.supplierId);
    component.supplierForm.controls['SupplierName'].setValue(addSupplierSchema.supplierName);
    component.supplierForm.controls['contactInformation'].setValue(addSupplierSchema.contactInformation);
    component.supplierForm.controls['address'].setValue(addSupplierSchema.address);
    component.supplierForm.controls['dateCreated'].setValue(addSupplierSchema.dateCreated);
    component.onSubmit();

    expect(suppliersService.addSupplierEntry).toHaveBeenCalledWith(addSupplierSchema);
    expect(router.navigate).toHaveBeenCalledWith(['/suppliers/create']);
  });

  it('Should handle error on form submission failure', () => {
    spyOn(suppliersService, 'addSupplierEntry').and.returnValue(throwError(() => new Error('Error adding supplier'))); // Check this later
    spyOn(console, 'error');

    component.supplierForm.controls['supplierId'].setValue(1);
    component.supplierForm.controls['supplierName'].setValue('Jakes Gadgets');
    component.supplierForm.controls['contactInformation'].setValue('715-299-2727');
    component.supplierForm.controls['address'].setValue('123 Best Stuff Way');
    component.supplierForm.controls['dateCreated'].setValue('2025-02-17T00:00');

    component.onSubmit();

    expect(suppliersService.addSupplierEntry).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(new Error('Error adding supplier'));
  });


});
