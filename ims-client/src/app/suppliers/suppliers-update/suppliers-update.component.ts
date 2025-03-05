/**
 * Author: Jake Seever
 * Date: March 3rd, 2025
 * File: suppliers-update.component.ts
 * description: Component file for updating a supplier
 */
import { Component } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormGroup,
} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SuppliersService } from '../suppliers.service';
import { UpdateSuppliersDTO } from '../suppliers';

@Component({
  selector: 'app-suppliers-update',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  template: `
    <div class="updateSupplier">
      <h1 class="page-title">Update Supplier</h1>
      <h4>Update Pre-existing Supplier</h4>
      <div class="page-card">
        <form [formGroup]="supplierForm" class="supplierForm">
          <div class="form-group">
            <label for="supplierId" class="form-label">Supplier ID</label>
            <input
              type="text"
              id="supplierId"
              class="form-control"
              formControlName="supplierId"
            />
          </div>

          <div class="form-group">
            <label for="supplierName" class="form-label">Supplier Name</label>
            <input
              type="text"
              id="supplierName"
              class="form-control"
              formControlName="supplierName"
            />
          </div>

          <div class="form-group">
            <label for="contactInformation" class="form-label"
              >Contact Information</label
            >
            <input
              type="text"
              id="contactInformation"
              class="form-control"
              formControlName="contactInformation"
            />
          </div>

          <div class="form-group">
            <label for="supplierAddress" class="form-label">Address</label>
            <input
              type="text"
              id="address"
              class="form-control"
              formControlName="address"
            />
          </div>

          <br />

          <button type="submit" class="btn btn-primary" (click)="onSubmit()">
            Update Supplier
          </button>
        </form>
      </div>
      <br />
      <a class="suppliers-list-link" routerLink="/suppliers">View Suppliers List</a>
    </div>
  `,
  styles: `
     .supplierForm{ 
     margin: 20px;
   }
   .page-title{
     margin-bottom: 20px;
   }
   .page-card{
     padding: 20px;
     border: 1px solid #ccc;
     border-radius: 5px;
     margin-top: 20px;
   }
   .form-group{
     margin-bottom: 20px;
   }
   .form-label{
     display: block;
     margin-bottom: 5px;
   }
   .form-control{
     width: 100%;
     padding: 10px;
     font-size: 16px;
     border-radius: 5px;
     border: 1px solid #ccc;
   }
   .btn-primary{
     padding: 10px 20px;
     font-size: 16px;
     background-color: #800080;
     color: #fff;
     border: none;
     border-radius: 5px;
     cursor: pointer;
   }
 
   .btn-primary:hover{
     background-color: #4B0082;
   }
 
   .btn-primary:active{
     background-color: #800080;
   }
   .suppliers-list-link{
     display: block;
     margin-top: 20px;
     color: #800080;
   }
   .suppliers-list-link:hover{
     color: #4B0082;
     text-decoration: underline;
   }
  `,
})
export class SuppliersUpdateComponent { // Export the supplierForm with Validators for the fields
  supplierForm: FormGroup = this.fb.group({
    supplierId: [null, Validators.compose([Validators.required])],
    supplierName: [
      null,
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
    ],
    contactInformation: [
      null,
      Validators.compose([Validators.required, Validators.maxLength(500)]),
    ],
    address: [null, Validators.compose([Validators.required])],
  });

  constructor(
    private fb: FormBuilder,
    private suppliersService: SuppliersService,
    private router: Router,
  ) {}

  onSubmit() {
    if (this.supplierForm.valid) { // Check if the form is valid

      const currentTime = new Date();
      const formValue = this.supplierForm.value; // Set the values variable to be updated equal to the ones on the form.
      const updateSupplierSchema: UpdateSuppliersDTO = { // Create the data transfer object and set the new values to the ones on the form.
        ...formValue,
        supplierId: formValue.supplierId,
        supplierName: formValue.supplierName,
        contactInformation: formValue.contactInformation,
        address: formValue.address,
        dateModified: currentTime
      };

      if (!formValue.supplierId) {
        console.error('Error: Supplier ID is required to update a supplier'); // Throw an error is a supplier ID is not entered.
        return;
      }else {
      console.log('Supplier has been updated', updateSupplierSchema); // Confirm the supplier has been updated. 
      }
      if (this.supplierForm.invalid) {
        return;
      }
      this.suppliersService
        .updateSupplierEntry(updateSupplierSchema, formValue.supplierId)
        .subscribe({
          next: () => {
            this.router.navigate(['/suppliers']); // Add a link to the suppliers list to visually verify the change
          },
          error: (error) => {
            console.error('Error updating Supplier'); // Console any errors that occur during update.
          },
        });
    }
  }
}
