//supplier-search.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';

import { SuppliersSearchComponent } from './suppliers-search.component'; // Ensure it's imported
import { SuppliersService } from '../suppliers.service';
import { supplierEntry } from '../suppliers';

describe('SuppliersSearchComponent', () => {
  let component: SuppliersSearchComponent;
  let fixture: ComponentFixture<SuppliersSearchComponent>;
  let suppliersService: jasmine.SpyObj<SuppliersService>;

  beforeEach(async () => {
    // Create a spy for SuppliersService
    suppliersService = jasmine.createSpyObj('SuppliersService', ['searchSuppliers', 'getSuppliers']);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule, // Mock HttpClient
        ReactiveFormsModule,
        RouterTestingModule,
        SuppliersSearchComponent // Add SuppliersSearchComponent here instead of declarations
      ],
      providers: [
        { provide: SuppliersService, useValue: suppliersService } // Provide the mock SuppliersService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SuppliersSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle search results correctly', () => {
    const mockSuppliers: supplierEntry []= [
      {
        _id: '123',
        supplierId: 17,
        supplierName: 'Supplier A',
        contactInformation: '123-456-7890',
        address: '123 Supplier St.',
        dateCreated: '2025-03-06',
      }
    ];

    suppliersService.searchSuppliers.and.returnValue(of(mockSuppliers[0])); // Mock the service call

    component.supplierForm.controls['name'].setValue('Supplier A');
    component.onSubmit(); // Trigger the form submission

    fixture.detectChanges();

    expect(component.suppliersList.length).toBe(1); // Ensure suppliers list is populated
    expect(component.suppliersList[0].supplierName).toBe('Supplier A'); // Check supplier name
  });

  it('should handle error in search', () => {
    suppliersService.searchSuppliers.and.returnValue(throwError(() => new Error('Search failed')));
    spyOn(console, 'error'); // Spy on console error

    component.supplierForm.controls['name'].setValue('Supplier A');
    component.onSubmit();

    expect(console.error).toHaveBeenCalledWith('Error occurred while finding suppliers by name', jasmine.any(Error));
  });
});
