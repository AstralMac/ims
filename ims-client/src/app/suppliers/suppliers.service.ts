import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { supplierEntry} from './suppliers'
import { environment } from '../../environments/environment';
import { AddSuppliersDTO, UpdateSuppliersDTO } from './suppliers';

@Injectable({
  providedIn: 'root' // Makes the service available globally
})
export class SuppliersService {
  deleteentry: any;
  constructor(private http: HttpClient) {}

  // Fetch all Supplier entrys
  getSuppliers(): Observable<supplierEntry[]> {
    return this.http.get<supplierEntry[]>(`${environment.apiBaseUrl}/api/suppliers/list`);
  }

  // Fetch a single Supplier entry by ID
  getSuppliersById(_id: string){
    return this.http.get<supplierEntry>(`${environment.apiBaseUrl}/api/suppliers/byid/${_id}`);
  }

  // Add a new Supplier entry
  addSupplierEntry(entry:AddSuppliersDTO){
    return this.http.post<supplierEntry>(`${environment.apiBaseUrl}/api/suppliers/create`, entry);
  }

  // Update an Supplier entry
  updateSupplierEntry(entry: UpdateSuppliersDTO, _id: string) {
    return this.http.patch<supplierEntry>(`${environment.apiBaseUrl}/api/suppliers/update/${_id}`, entry);
  }

  // Delete an Supplier entry
  deleteSupplierEntry(_id: string) {
    return this.http.delete(`${environment.apiBaseUrl}/api/suppliers/delete/${_id}`);
  }
  // Fetch Supplier entrys by search term
  searchSuppliers(name: string){
    return this.http.get<supplierEntry>(`${environment.apiBaseUrl}/api/suppliers/search/${name}`);
  }
}
