import { SuppliersService } from './../suppliers.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { supplierEntry } from '../suppliers';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-suppliers-by-id',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  template: `
    <div class='SBI-container'>
      <h1 class='title'>Supplier By Id</h1>
      <h4 class='subtitle'>Find supplier by ID</h4>
      <div class='formContainer'>
        <form [formGroup]='supplierForm' (ngSubmit)='onSubmit()' class='supplierBIForm'>
          <div class='formGroup'>
            <label for='_id' class='form-label'>ID</label>
            <input type='text' id='_id' class='form-control' formControlName='_id'>
          </div>

          <div class='form-actions'>
            <button class='findSupplierButton' type='submit'>Find Supplier</button>
          </div>
        </form>
        <div class='SLL-container'>
          <a class='suppliers-list-link' routerLink='/suppliers'>View All Suppliers</a>
        </div>
      </div>
      <div *ngIf='isTableVisible'>
        <table class='supplier-page-table' *ngIf='suppliers.length > 0'>
          <thead class='supplier-page-thead'>
            <tr class='supplier-page-row'>
              <th class='supplier-page-header'>ID</th>
              <th class='supplier-page-header'>Supplier ID</th>
              <th class='supplier-page-header'>Supplier Name</th>
              <th class='supplier-page-header'>Contact Information</th>
              <th class='supplier-page-header'>Address</th>
              <th class='supplier-page-header'>Date Created</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let supplier of suppliers; trackBy: trackSupplier">
              <td class='supplier-page-table-cell'>{{supplier._id}}</td>
              <td class='supplier-page-table-cell'>{{supplier.supplierId}}</td>
              <td class='supplier-page-table-cell'>{{supplier.supplierName}}</td>
              <td class='supplier-page-table-cell'>{{supplier.contactInformation}}</td>
              <td class='supplier-page-table-cell'>{{supplier.address}}</td>
              <td class='supplier-page-table-cell'>{{supplier.dateCreated}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: `
    .SBI-container { margin: 20px auto; max-width: 800px; padding: 20px; }
    .title { text-align: center; margin-bottom: 20px; }
    .subtitle { text-align: center; margin-bottom: 10px; }
    .formContainer { padding: 20px; border: 1px solid #800080; border-radius: 5px; margin-top: 20px; }
    .form-label { display: block; margin-bottom: 5px; }
    .form-control { width: 80%; padding: 10px; font-size: 16px; border-radius: 5px; border: 1px solid #800080; }
    .btn-primary { padding: 10px 20px; font-size: 16px; color: #800080; background-color: #ffff00; border: none; border-radius: 5px; cursor: pointer; }
    .btn-primary:hover { background-color: #800080; color: #ffff00; }
    .suppliers-list-link { display: block; text-align: center; margin-top: 20px; color: #0000ff; }
    .suppliers-list-link:hover { text-decoration: underline; }
    .supplier-page-table{
      width: 100%;
      border-collapse: collapse;
    }
    .supplier-page-thead{}
    .supplier-page-row{}
    .supplier-page-header{
      background-color: #800080;
      color: #ffff00;
     border: 1px solid black;
     padding: 5px;
     text-align: left;
    }
    .supplier-page-table-cell{
      border: 1px solid black;
      padding: 5px;
      text-align: center
    }
  `
})
export class SuppliersByIdComponent {
  suppliers: supplierEntry[] = [];
  isTableVisible: boolean = false;
  supplierForm: FormGroup = this.fb.group({
    _id: [null, Validators.required]
  });

  trackSupplier(index: number, item: supplierEntry) {
  return item._id; // or item.supplierId if _id is missing
}


  constructor(private fb: FormBuilder, private suppliersService: SuppliersService, private router: Router, private route: ActivatedRoute, private cd: ChangeDetectorRef) {}

  onSubmit() {
    if (this.supplierForm.invalid) {
      console.error('ID is required');
      return;
    }

    const formValue = this.supplierForm.value;

    this.suppliersService.getSuppliersById(formValue._id).subscribe({
      next: (suppliers) => {
        this.suppliers = suppliers ? [suppliers] : [];
        console.log(this.suppliers)
        this.isTableVisible = this.suppliers.length >0;
        console.log(this.isTableVisible)
        this.cd.detectChanges(); //force the table to update
      },
      error: () => {
        console.error('Error with finding supplier entry with that ID. Error: Item not found');
        this.suppliers = [];
        this.isTableVisible = false;
      }
    });
  }
}
