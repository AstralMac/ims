import { SuppliersService } from './../suppliers.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SuppliersByIdComponent } from './suppliers-by-id.component';

describe('SuppliersByIdComponent', () => {
  let component: SuppliersByIdComponent;
  let fixture: ComponentFixture<SuppliersByIdComponent>;
  let suppliersService: jasmine.SpyObj<SuppliersService>;
  let router: Router;

  beforeEach(async () => {
    suppliersService = jasmine.createSpyObj('SuppliersService', ['getSuppliersById']);

    await TestBed.configureTestingModule({
      imports: [SuppliersByIdComponent, HttpClientTestingModule, ReactiveFormsModule, RouterTestingModule, CommonModule, FormsModule],
      providers: [{ provide: SuppliersService, useValue: suppliersService }]
    }).compileComponents();

    fixture = TestBed.createComponent(SuppliersByIdComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display Supplier details upon successful retrieval', () => {
    const mockSupplierEntry = {
      _id: '650c1f1e1c9d440000a1b1c1',
      supplierId: 1,
      supplierName: 'TechSupplier',
      contactInformation: '123-456-5678',
      address: '123 Tech Street',
      dateCreated: '2021-01-01T00:00:00.000Z'
    };

    suppliersService.getSuppliersById.and.returnValue(of(mockSupplierEntry));
    component.supplierForm.controls['_id'].setValue('650c1f1e1c9d440000a1b1c1');
    component.onSubmit();

    expect(component.isTableVisible).toBeTrue();
    expect(component.suppliers).toEqual([mockSupplierEntry]);
  });

  it('should handle an error when a supplier is not found', () => {
    suppliersService.getSuppliersById.and.returnValue(throwError(() => new Error('Supplier not found')));
    spyOn(console, 'error');

    component.supplierForm.controls['_id'].setValue('invalid-id');
    component.onSubmit();

    expect(console.error).toHaveBeenCalledWith('Error with finding supplier entry with that ID. Error: Item not found');
  });
});
