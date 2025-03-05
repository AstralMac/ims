/**
 * Author: Jake Seever
 * Date: March 4th, 2025
 * File: suppliers-update.component.spec.ts
 * description: Component testing file for updating a supplier
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  HttpClientTestingModule,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { AddSuppliersDTO, UpdateSuppliersDTO } from '../../suppliers/suppliers';
import { SuppliersUpdateComponent } from './suppliers-update.component';
import { SuppliersService } from '../suppliers.service';
import { dateTimestampProvider } from 'rxjs/internal/scheduler/dateTimestampProvider';

describe('SuppliersUpdateComponent', () => {
  let component: SuppliersUpdateComponent;
  let fixture: ComponentFixture<SuppliersUpdateComponent>;
  let suppliersService: SuppliersService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SuppliersUpdateComponent,
        ReactiveFormsModule,
        HttpClientTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SuppliersUpdateComponent);
    component = fixture.componentInstance;
    suppliersService = TestBed.inject(SuppliersService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should have a valid form when all fields are filled in and validated', () => {
    component.supplierForm.controls['supplierId'].setValue('17');
    component.supplierForm.controls['supplierName'].setValue('Jakes Gadgets');
    component.supplierForm.controls['contactInformation'].setValue('715-299-9999');
    component.supplierForm.controls['address'].setValue('123 Best Stuff Way');
    expect(component.supplierForm.valid).toBeTrue();
  });

  it('Should call updateSupplier and navigate on successful form submission', () => {
    const updateSupplierSchema: UpdateSuppliersDTO = {
      supplierId: 17,
      supplierName: 'Test',
      contactInformation: '715-299-9999',
      address: '123 Best Gadget Way',
      dateModified: new Date(),
    };

    const mockInventoryItem = {
      supplierId: 17,
      ...updateSupplierSchema,
    };
    spyOn(suppliersService, 'updateSupplierEntry').and.returnValue(
      of(mockInventoryItem)
    );
    spyOn(router, 'navigate');

    component.supplierForm.controls['supplierId'].setValue(
      updateSupplierSchema.supplierId
    );
    component.supplierForm.controls['supplierName'].setValue(
      updateSupplierSchema.supplierName
    );
    component.supplierForm.controls['contactInformation'].setValue(
      updateSupplierSchema.contactInformation
    );
    component.supplierForm.controls['address'].setValue(
      updateSupplierSchema.address
    );

    component.onSubmit();

    expect(suppliersService.updateSupplierEntry).toHaveBeenCalledWith(
      updateSupplierSchema,
      mockInventoryItem.supplierId
    );
    expect(router.navigate).toHaveBeenCalledWith(['/suppliers']);
  });

  it('Should handle error on form submission failure', () => {
    spyOn(suppliersService, 'updateSupplierEntry').and.returnValue(
      throwError(() => new Error('Error adding supplier'))
    );
    spyOn(console, 'error');

    component.supplierForm.controls['supplierId'].setValue('Jake'); //Form not valid because the Id should be a number
    component.supplierForm.controls['supplierName'].setValue('Jakes Gadgets');
    component.supplierForm.controls['contactInformation'].setValue('715-299-2727');
    component.supplierForm.controls['address'].setValue('123 Best Stuff Way');

    component.onSubmit();

    expect(suppliersService.updateSupplierEntry).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Error updating Supplier');
  });
});
