/**
 * Author: Malcolm Abdullah
 * Date: March 6th, 2025
 * File: suppliers-delete.component.ts
 * Description: Front end component to delete supplier entries
 */
import { Component } from '@angular/core';
import { SuppliersService } from '../suppliers.service';
import { supplierEntry } from '../suppliers';
import { CommonModule} from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgModule, ChangeDetectorRef, OnInit } from '@angular/core';
@Component({
  selector: 'app-suppliers-delete',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  template: `
    <div class= 'page-container'>
      <h1 class='supplier-page_title'>Delete Supplier Entry</h1>
      <button class='supplierEntries_button' [routerLink]="'/suppliers/add'">Add Supplier Entry</button>
      <button class='supplierEntries_button' [routerLink]="'/suppliers/update'">Update Supplier Entry</button>

      <!--This is the container for message if deletion was successful or if an error occured-->
      <div class='serverMessage-container' *ngIf='serverMessage'
      [ngClass]='{
        "message-alert": serverMessageType === "error",
        "message-success": serverMessageType === "success",
        "message-default": !serverMessageType}'>
        {{serverMessage}}
      </div>

      <!--This is the container to hold all supplier entries in the suppliers list-->
      <div class ='supplier-page-table-container' *ngIf='suppliers && suppliers.length>0; else noSuppliers'>
        <table class='supplier-page-table'>
          <thead class='supplier-page_table-head'>
            <tr class='supplier-page_table-row'>
              <th class='supplier-page_table-header'>_Id</th>
              <th class='supplier-page_table-header'>Supplier Id</th>
              <th class='supplier-page_table-header'>Supplier Name</th>
              <th class='supplier-page_table-header'>Contact Information</th>
              <th class='supplier-page_table-header'>Address</th>
              <th class='supplier-page_table-header'>Date Created</th>
              <th class='supplier-page_table-header'>Delete?</th>
            </tr>
          </thead>
            <tbody class='supplier-page_table-body'>
              <tr class='supplier-page_table-row' *ngFor= 'let supplier of suppliers; trackBy: trackSupplier'>
                <td class='supplier-page_table-data'>{{supplier._id}}</td>
                <td class='supplier-page_table-data'>{{supplier.supplierId}}</td>
                <td class='supplier-page_table-data'>{{supplier.supplierName}}</td>
                <td class='supplier-page_table-data'>{{supplier.contactInformation}}</td>
                <td class='supplier-page_table-data'>{{supplier.address}}</td>
                <td class='supplier-page_table-data'>{{supplier.dateCreated}}</td>
                <td class='supplier-page_table-data supplier-page_table-action'>
                  <a class='supplier-page_delete-icon' *ngIf='supplier._id' (click)='deleteSupplier(supplier._id)'>
                    <i class='fas fa-trash-alt'></i>
                  </a>
                </td>
              </tr>
            </tbody>
        </table>
      </div>
      <!--Defining the else template-->
      <ng-template #noSuppliers>
        <p class='supplier-page_no-items'>No suppliers found, Add a supplier to database</p>
      </ng-template>
    </div>
  `,
  styles: `
  .page-container{
    max-width: 85%;
    margin: 0 auto;
    padding: 20px;
  }

  .supplier-page_title{
    text-align: center;
    color: #800080;
  }

  .suppliersEntries_button{
    background-color: #800080;
    color: #ffff00;
    border: none;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    margin: 10px 2px;
    transition: background-color 0.3;
  }

  .suppliersEntries_button:hover{
    background-color: #ffff00;
    color: #800080;
    text-decoration: underline;
  }

  .serverMessage-container{
    border: solid 3px #800080;
  }

  .supplier-page-table{
    width: 100%;
    border-collapse: collapse;
  }

  .supplier-page_table-header{
    background-color: #ffff00;
    color: #800080;
    border: 1px solid black;
    padding: 4px;
    text-align: center;
  }

  .supplier-page_table-data{
    border: 1px solid black;
    padding: 5px;
    text-align: center;
  }

  .supplier-page_table-action{
    text-align: center;
  }

  .supplier-page_delete-icon{
    color: #000000;
  }
  .supplier-page_delete-icon:hover{
    color: #ff0000;
  }
  .message-alert{
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid transparent;
    border-radius: 4px;
    color: #ff0000;
    background-color: #f2dede;
    border-color: #ebccd1;
  }

  .message-success{
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid transparent;
    border-radius: 4px;
    color: #3c763d;
    background-color: #dff0d8;
    border-color: #d6e9c6;
  }
  `
})
export class SuppliersDeleteComponent {
  suppliers: supplierEntry [] = [];
  serverMessage: string | null = null;
  serverMessageType: 'success' | 'error' | null = null;

  constructor(private suppliersService: SuppliersService, private fb: FormBuilder, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.suppliersService.getSuppliers().subscribe({
      next: (suppliers: supplierEntry[]) => {
        this.suppliers = suppliers;
        console.log(`Suppliers List: ${JSON.stringify(this.suppliers)}`);
      },
      error: (err: any) =>{
        console.error(`Error occured while retrieving suppliers: ${err}`);
      }
    });
  }

  deleteSupplier(_id: string){
    if(this.suppliers.length === 0){
      this.serverMessageType= 'error';
      this.serverMessage = 'No suppliers found. Cannot delete supplier entry.';
      this.clearMessageAfterDelay();
      return;
    }
    if(!confirm('Do you want to delete this supplier entry?')){
      return;
    }
    this.suppliersService.deleteSupplierEntry(_id).subscribe({
      next: () => {
        console.log(`Supplier entry with ID ${_id} deleted successfully`);
        this.suppliers = this.suppliers.filter(i => i._id !== _id);
        this.serverMessageType = 'success';
        this.serverMessage = `Supplier entry with ID ${_id} deleted successfully`;
        this.clearMessageAfterDelay();
      },
      error: (err: any) => {
        console.error(`Error occurred while deleting suppliers: ${err}`);
        this.serverMessageType = 'error';
        this.serverMessage = `Error occurred while deleting supplier entry with ID. Please try again.`;
        this.clearMessageAfterDelay();
      }
    });
  }

  trackSupplier(index: number, suppliers: supplierEntry): string{
    return suppliers._id;
  }

  private clearMessageAfterDelay() {
    setTimeout(()=> {
      this.serverMessage = null;
      this.serverMessageType =null;
    }, 5000);
  }
}
