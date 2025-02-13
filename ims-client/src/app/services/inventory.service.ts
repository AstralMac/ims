import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Makes the service available globally
})
export class InventoryService {
  private apiUrl = 'http://localhost:5000/api/inventory'; // Update with your API URL

  constructor(private http: HttpClient) {}

  // Fetch all inventory items
  getInventory(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Fetch a single inventory item by ID
  getInventoryById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Add a new inventory item
  addInventoryItem(item: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, item);
  }

  // Update an inventory item
  updateInventoryItem(id: string, item: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, item);
  }

  // Delete an inventory item
  deleteInventoryItem(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
