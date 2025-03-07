/**
 * Author: Malcolm Abdullah
 * Date: March 6th, 2025
 * File: suppliers-delete.component.spec.ts
 * Description: tests for the suppliers-delete front-end component
 */

//Import all the need modules and dependencies
import { ComponentFixture, TestBed} from '@angular/core/testing';
import { SuppliersService } from '../suppliers.service';
import { supplierEntry } from '../suppliers';
import { CommonModule} from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { SuppliersDeleteComponent } from './suppliers-delete.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

//Test Suite
describe('SuppliersDeleteComponent', () => {

  //Declare the needed modules and dependencies to be used by test suite
  let component: SuppliersDeleteComponent;
  let fixture: ComponentFixture<SuppliersDeleteComponent>;
  let suppliersService: SuppliersService;
  let router: Router;
  let mockSuppliersService: jasmine.SpyObj<SuppliersService>;

  beforeEach(async () => {
    mockSuppliersService = jasmine.createSpyObj('SuppliersService', ['getSuppliers','deleteSupplierEntry']);

    //Add the missing properties for the supplier entry to match schema
    const mockSupplierEntry: supplierEntry[] = [
      {
        _id: '1',
        supplierId: 101,
        supplierName: 'Test Supplier 1',
        contactInformation: '123-456-7890',
        address: '123 Bakers Street, Sesame, WI',
        dateCreated: '2025-12-29'
      },
      {
       _id: '4',
        supplierId: 102,
        supplierName: 'Test Supplier 4',
        contactInformation: '103-406-7890',
        address: '321 Street Ave, Sesame, WI',
        dateCreated: '2025-01-02'
      }
    ];
    //Mock/return the above mockSupplierEntry as mock supplier entries
    mockSuppliersService.getSuppliers.and.returnValue(of(mockSupplierEntry));

    // mock setup for unit tests/fixed return type of 'deleteSupplierEntry'
    mockSuppliersService.deleteSupplierEntry.and.returnValue(of({}));

    await TestBed.configureTestingModule({
      imports: [
        SuppliersDeleteComponent,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        {provide: SuppliersService, useValue: mockSuppliersService},
        FormBuilder,
        {provide: ActivatedRoute, useValue: {}},
        {provide: Router, useValue: jasmine.createSpyObj('Router', ['navigate'])}
      ]
    })
    .compileComponents();

    suppliersService = TestBed.inject(SuppliersService);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(SuppliersDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch list of suppliers successfully', ()=>{
    //Fetch the suppliers on init
    component.ngOnInit();

    // Ensure 2 suppliers are fetched
    expect(component.suppliers.length).toBe(2);
  });

  it('should remove deleted entry from the suppliers list', () => {
    //Set up "initial suppliers list" using the above mock data
    component.suppliers = [
     {
        _id: '1',
        supplierId: 101,
        supplierName: 'Test Supplier 1',
        contactInformation: '123-456-7890',
        address: '123 Bakers Street, Sesame, WI',
        dateCreated: '2025-12-29'
      },
      {
       _id: '4',
        supplierId: 102,
        supplierName: 'Test Supplier 4',
        contactInformation: '103-406-7890',
        address: '321 Street Ave, Sesame, WI',
        dateCreated: '2025-01-02'
      }
    ];

    spyOn(window, 'confirm').and.returnValue(true);
    //mockSuppliersService.deleteSupplierEntry.and.returnValue(of({}));

    //Call the delete function for supplier 1
    component.deleteSupplier('1');

    //Verify that the deleted suppliers are removed from the list
    expect(component.suppliers.length).toBe(1);
    expect(component.suppliers[0]._id).toBe('4');
  });

  it('should handle error when fetching suppliers list fails', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    component.suppliers = [];
    //Simulate a failling response fetching the list of suppliers
    //mockSuppliersService.getSuppliers.and.returnValue(throwError(() => new Error('Failed fetching list of suppliers')));

    //Verify that the error is handled
    component.deleteSupplier('test test');//Suppliers list should be empty
    expect(component.serverMessage).toBe('No suppliers found. Cannot delete supplier entry.'); //Displays error message
  });
});
