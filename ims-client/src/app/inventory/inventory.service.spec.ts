import { StylesUnion } from './../../../node_modules/@angular-devkit/build-angular/src/builders/browser/schema.d';
import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { InventoryService } from "./inventory.service";
import { inventoryItems } from "./inventory";
import { UpdateInventoryDTO, AddInventoryDTO } from "./inventory";
import { environment } from "../../environments/environment";
import { sample } from 'rxjs';
/**
 * Malcolm Abdullah
 * Date: February 17th, 2025
 * file: inventory.service.spec.ts
 * description:
 */



describe('Inventory Service', ()=>{
  let service: InventoryService;
  let httpMock: HttpTestingController;
  beforeEach(()=>{
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InventoryService]
    });
    service = TestBed.inject(InventoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(()=> {
    httpMock.verify();
  });

  it('should retrieve all inventory items', ()=>{
    const sampleItems: inventoryItems[] = [
  {
    _id: "650c1f1e1c9d440000a1b1c1",
    categoryId: 1000,
    supplierId: 1,
    name: "Laptop",
    description: "High-end gaming laptop",
    quantity: 10,
    price: 1500.00,
    dateCreated: "2021-01-01T00:00:00.000Z",
    dateModified: "2021-01-01T00:00:00.000Z"
  },
  {
    _id: "650c1f1e1c9d440000a1b1c2",
    categoryId: 1000,
    supplierId: 2,
    name: "Mechanical Keyboard",
    description: "RGB backlit mechanical keyboard",
    quantity: 25,
    price: 120.00,
    dateCreated: "2021-02-15T00:00:00.000Z",
    dateModified: "2021-02-15T00:00:00.000Z"
  },
  {
    _id: "650c1f1e1c9d440000a1b1c3",
    categoryId: 1000,
    supplierId: 3,
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse with adjustable DPI",
    quantity: 40,
    price: 60.00,
    dateCreated: "2021-03-10T00:00:00.000Z",
    dateModified: "2021-03-10T00:00:00.000Z"
  },
  {
    _id: "650c1f1e1c9d440000a1b1c4",
    categoryId: 1000,
    supplierId: 1,
    name: "27-inch Monitor",
    description: "4K UHD monitor with HDR support",
    quantity: 15,
    price: 400.00,
    dateCreated: "2021-04-05T00:00:00.000Z",
    dateModified: "2021-04-05T00:00:00.000Z"
  },
  {
    _id: "650c1f1e1c9d440000a1b1c5",
    categoryId: 1000,
    supplierId: 4,
    name: "Gaming Headset",
    description: "Surround sound gaming headset with noise cancellation",
    quantity: 30,
    price: 80.00,
    dateCreated: "2021-05-20T00:00:00.000Z",
    dateModified: "2021-05-20T00:00:00.000Z"
  },
  {
    _id: "650c1f1e1c9d440000a1b1c6",
    categoryId: 1000,
    supplierId: 2,
    name: "External SSD",
    description: "1TB portable SSD with USB-C",
    quantity: 20,
    price: 150.00,
    dateCreated: "2021-06-12T00:00:00.000Z",
    dateModified: "2021-06-12T00:00:00.000Z"
  }
];
    service.getInventory().subscribe(items=>{
      expect(items.length).toBe(sampleItems.length);
      expect(items).toEqual(sampleItems);
    });
    const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/inventory/list`);
    expect(req.request.method).toBe('GET');
    req.flush(sampleItems);
  });

  it('should retrieve a single item by _id', ()=>{
   const sampleItems: inventoryItems =
     {
    _id: "650c1f1e1c9d440000a1b1c1",
    categoryId: 1000,
    supplierId: 1,
    name: "Laptop",
    description: "High-end gaming laptop",
    quantity: 10,
    price: 1500.00,
    dateCreated: "2021-01-01T00:00:00.000Z",
    dateModified: "2021-01-01T00:00:00.000Z"
  };
  service.getInventoryById("650c1f1e1c9d440000a1b1c1").subscribe(item =>{
    expect(item).toEqual(sampleItems);
  });
  const req = httpMock.expectOne(`${environment.apiBaseUrl}/api/inventory/item/650c1f1e1c9d440000a1b1c1`);
  expect(req.request.method).toBe('GET');
  req.flush(sampleItems);
  });

  it('should add a new inventory item', ()=>{

  });

  it('', ()=>{});

  it('', ()=>{});

  it('', ()=>{});
  })
