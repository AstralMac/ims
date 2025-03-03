import { SuppliersService } from './../suppliers.service';
import { supplierEntry } from './../suppliers';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuppliersListComponent } from './suppliers-list.component';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { fakeAsync, flush } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

describe('SuppliersListComponent', () => {
  let component: SuppliersListComponent;
  let fixture: ComponentFixture<SuppliersListComponent>;
  let suppliersService: jasmine.SpyObj<SuppliersService>;
  let router: Router;

  beforeEach(async () => {
    // ✅ Create a mock SuppliersService with getSuppliers method
    const suppliersServiceSpy = jasmine.createSpyObj<SuppliersService>('SuppliersService', ['getSuppliers']);

    await TestBed.configureTestingModule({
      imports: [
        SuppliersListComponent, // ✅ Standalone component should be imported, not declared
        HttpClientTestingModule,
        CommonModule,
        RouterTestingModule
      ],
      providers: [{ provide: SuppliersService, useValue: suppliersServiceSpy }]
    }).compileComponents();

    suppliersService = TestBed.inject(SuppliersService) as jasmine.SpyObj<SuppliersService>;
    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(SuppliersListComponent);
    component = fixture.componentInstance;
  });

  // ✅ Ensure component is initialized properly
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // ✅ Test for fetching suppliers list
  it('should fetch suppliers list', fakeAsync(() => {
    const mockSuppliers: supplierEntry[] = [
      {
        _id: '12345',
        supplierName: 'Supplier A',
        contactInformation: '123-456-7890',
        address: '123 Supplier St.',
      }
    ];

    // ✅ Mock getSuppliers() to return an observable
    suppliersService.getSuppliers.and.returnValue(of(mockSuppliers));

    // ✅ Trigger change detection
    fixture.detectChanges();
    flush();

    // ✅ Log suppliers list to debug
    console.log('Suppliers List:', component.suppliersList);

    // ✅ Ensure the suppliers list is populated
    expect(component.suppliersList.length).toBe(1);
    expect(component.suppliersList[0].supplierName).toBe('Supplier A');
  }));
});
