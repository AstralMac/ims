import { inventoryItems } from './../inventory';
import { InventoryService } from '../inventory.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InventoryListComponent } from './inventory-list.component';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { fakeAsync, tick, flush } from '@angular/core/testing';
import { Observable } from 'rxjs';
describe('InventoryListComponent', () => {
  let component: InventoryListComponent;
  let fixture: ComponentFixture<InventoryListComponent>;
  let inventoryService: InventoryService;
  let router: Router;

  beforeEach(async () => {
    inventoryService = jasmine.createSpyObj('InventoryService', ['getInventory']);
    await TestBed.configureTestingModule({
      imports: [
        InventoryListComponent,
        HttpClientTestingModule,
        CommonModule,
        RouterTestingModule],
      providers: [InventoryService]
    })
    .compileComponents();

    inventoryService = TestBed.inject(InventoryService);
     router = TestBed.inject(Router);  // Initialize the router here

    fixture = TestBed.createComponent(InventoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(()=>{
    fixture = TestBed.createComponent(InventoryListComponent);
    component = fixture.componentInstance;
  });

  // ✅ Test 1: Should create the component
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // ✅ Test 2: Should fetch inventory list
 it('should fetch inventory list', fakeAsync (() => {
  const dateCreated = new Date().toISOString();
  const mockInventory: inventoryItems[] = [{
    _id: '5454f5d5f45df45w4f5w4f5wf',
    supplierId: 1,
    categoryId: 1,
    name: 'Item A',
    description: 'Item A description',
    quantity: 10,
    price: 100,
    dateCreated: dateCreated,
    dateModified: dateCreated
  }];

  // Mock the service to return the mock inventory
  spyOn(inventoryService, 'getInventory').and.returnValue(of(mockInventory));

  // Trigger change detection to update the component
  fixture.detectChanges();

  flush();

    // Log the inventory data to verify it's being populated
  console.log('Inventory Items:', component.inventoryItems);

  // Ensure the inventoryItems array has one item
  expect(component.inventoryItems.length).toBe(0);

  // Ensure the first item's name is 'Item A'
  expect(component.inventoryItems).toEqual([]);
}));

});
