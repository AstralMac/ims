//suppliers-search.component.ts

/**
 * Author: Joseph Sarno
 * Date: 03 March 2025
 * File: suppliers-search.ts
 * Description: The suppliers search component
 */

import { AfterViewInit, Component } from '@angular/core';
import { SuppliersService } from '../suppliers.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { supplierEntry } from '../suppliers';

@Component({
  selector: 'app-suppliers-search',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  template: `
    <div class="item-container">
      <h1>Search Suppliers By Name</h1>
      <form class="form" [formGroup]="supplierForm" (ngSubmit)="onSubmit()">
        <input
          class="formInput"
          type="text"
          id="name"
          name="name"
          placeholder="Enter supplier name"
          formControlName="name"
        />
        <div class="form__actions">
          <button class="button button--primary" type="submit">Find Supplier</button>
        </div>
      </form>

      <div *ngIf="isTableVisible">
        @if (suppliersList && suppliersList.length > 0) {
        <table class="suppliers-page__table">
          <thead class="suppliers-page__table-head">
            <tr class="suppliers-page__table-row">
              <th class="suppliers-page__table-header">Supplier ID</th>
              <th class="suppliers-page__table-header">Name</th>
              <th class="suppliers-page__table-header">Contact Information</th>
              <th class="suppliers-page__table-header">Address</th>
            </tr>
          </thead>
          <tbody class="suppliers-page__table-body">
            @for (supplier of suppliersList; track supplier) {
            <tr class="suppliers-page__table-row">
              <td class="suppliers-page__table-cell">{{ supplier.supplierId }}</td>
              <td class="suppliers-page__table-cell">{{ supplier.supplierName }}</td>
              <td class="suppliers-page__table-cell">{{ supplier.contactInformation }}</td>
              <td class="suppliers-page__table-cell">{{ supplier.address }}</td>

            </tr>
            }
          </tbody>
        </table>
        }
      </div>
    </div>
    <div *ngIf="isMessageVisible">
      <h3>{{this.errMessage}}</h3>
    </div>

     <!-- <div *ngIf="isTableVisible">
        <table class="suppliers-page__table">
          <thead class="suppliers-page__table-head">
            <tr>
              <th class="suppliers-page__table-header">Supplier ID</th>
              <th class="suppliers-page__table-header">Name</th>
              <th class="suppliers-page__table-header">Contact Information</th>
              <th class="suppliers-page__table-header">Address</th>
            </tr>
          </thead>
          <tbody class="suppliers-page__table-body">
            <tr *ngFor="let supplier of suppliersList">
              <td class="suppliers-page__table-cell">{{ supplier._id }}</td>
              <td class="suppliers-page__table-cell">{{ supplier.supplierName }}</td>
              <td class="suppliers-page__table-cell">{{ supplier.contactInformation }}</td>
              <td class="suppliers-page__table-cell">{{ supplier.address }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div> -->
  `,
  styles: [
    `
      h1 {
        font-size: 2em;
      }
      .form {
        width: 80%;
        text-align: center;
        margin: auto;
        padding: 1%;
      }
      .formInput {
        width: 30%;
      }
      .form_actions {
        margin-top: 2%;
      }
      .button {
        margin-top: 1%;
        margin-bottom: 1%;
      }
      .suppliers-page {
        max-width: 80%;
        margin: 0 auto;
        padding: 20px;
      }
      .suppliers-page__table {
        width: 100%;
        border-collapse: collapse;
      }
      .suppliers-page__table-header {
        background-color: #FFE484;
        color: #000;
        border: 1px solid black;
        padding: 5px;
        text-align: left;
      }
      .suppliers-page__table-cell {
        border: 1px solid black;
        padding: 5px;
        text-align: left;
      }
    `
  ]
})
export class SuppliersSearchComponent implements AfterViewInit {
  isTableVisible: boolean = false;
  isMessageVisible: boolean = false;
  errMessage: string = "";
  suppliersList: supplierEntry[] = [];

    supplierForm: FormGroup= this.fb.group({
      name: [null, Validators.compose([Validators.required,Validators.minLength(3), Validators.maxLength(100)])],
      contactInformation:[null, Validators.compose([Validators.required, Validators.maxLength(500)])],
      address: [null, Validators.compose([Validators.required])],
  });

  constructor(
    private suppliersService: SuppliersService,
    private fb: FormBuilder
  ) {

     this.suppliersService.getSuppliers().subscribe({
        next: (supplier: supplierEntry[]) => {
          this.suppliersList = supplier;
          console.log(`Suppliers: ${JSON.stringify(this.suppliersList)}`);
        },
        error: (err: any) => {
          console.error(`Error occurred while retrieving Suppliers: ${err}`);
        },
      });
  }

  ngAfterViewInit(): void {}

  onSubmit() {
    this.isTableVisible = false;
    this.isMessageVisible = false;
    const name = this.supplierForm.controls['name'].value
    if(this.supplierForm.controls['name'].value != null){
name.trim(); // Ensure no accidental spaces
    console.log(name);
    }
    this.suppliersService
      .searchSuppliers(name)
      .subscribe({
        next: () => {
          if(name != null){
            this.suppliersList= this.suppliersList.filter(
            (i) => i.supplierName == name
          );
          if(this.suppliersList.length > 0) {
            console.log(`Supplier with name of ${name} found successfully`);
            console.log(this.suppliersList);
            console.log(`Suppliers: ${JSON.stringify(this.suppliersList)}`);
            this.isTableVisible = true;

            this.supplierForm.reset();

           } else{
            this.errMessage = "Supplier with that name could not be found";
            this.isMessageVisible = true;
             console.log(this.errMessage);
             this.supplierForm.reset();
           }
        }else {
           this.errMessage = "Supplier name cannot be empty";
          this.isMessageVisible = true;
            console.log(this.errMessage);
          }


        },
        error: (err: any) => {
          console.error(
            'Error occurred while finding inventory with that name'
          );
        },
      });
  }
}
