import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inventoryItems } from './inventory';
import { environment } from '../../environments/environment';
import { UpdateInventoryDTO, AddInventoryDTO } from './inventory';

@Injectable({
  providedIn: 'root' // Makes the service available globally
})
export class InventoryService {
  deleteItem: any;
  constructor(private http: HttpClient) {}

  // Fetch all inventory items
  getInventory(){
    return this.http.get<inventoryItems[]>(`${environment.apiBaseUrl}/api/inventory`);
  }

  // Fetch a single inventory item by ID
  getInventoryById(_id: string){
    return this.http.get<inventoryItems>(`${environment.apiBaseUrl}/api/inventory/${_id}`);
  }

  // Add a new inventory item
  addInventoryItem(item:AddInventoryDTO){
    return this.http.post<inventoryItems>(`${environment.apiBaseUrl}/api/inventory/inventoryItem`, item);
  }

  // Update an inventory item
  updateInventoryItem(item: UpdateInventoryDTO, _id: string) {
    return this.http.put<inventoryItems>(`${environment.apiBaseUrl}/api/inventory/${_id}`, item);
  }

  // Delete an inventory item
  deleteInventoryItem(_id: string) {
    return this.http.delete(`${environment.apiBaseUrl}/api/inventory/${_id}`);
  }
}
