/**
 * Author: Jake Seever
 * Date: 15 February 2025
 * File: inventory-by-id.js
 * Description: The inventory by id component
 */


import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { CommonModule, NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { inventoryItems } from '../inventory';

@Component({
  selector: 'app-inventory-by-id',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  template: `
    <div class="item-container">
      <h1>Get Item By Id</h1>
      <form class="form" [formGroup]="itemForm" (ngSubmit)="onSubmit()">
        <input
          class="formInput"
          type="text"
          id="_id"
          name="_id"
          placeholder="Enter the item ID"
          formControlName="_id"
        />

        <div class="form__actions">
          <button class="button button--primary" type="submit">Get Item</button>
        </div>
      </form>

      <div *ngIf="isTableVisible">
        @if (inventoryItems && inventoryItems.length > 0) {
        <table class="inventory-page__table">
          <thead class="inventory-page__table-head">
            <tr class="inventory-page__table-row">
              <th class="inventory-page__table-header">Item ID</th>
              <th class="inventory-page__table-header">Name</th>
              <th class="inventory-page__table-header">Quantity</th>
              <th class="inventory-page__table-header">Description</th>
              <th class="inventory-page__table-header">Date Added</th>
              <th class="inventory-page__table-header">Actions</th>
            </tr>
          </thead>
          <tbody class="inventory-page__table-body">
            @for (inventory of inventoryItems; track inventory) {
            <tr class="inventory-page__table-row">
              <td class="inventory-page__table-cell">{{ inventory._id }}</td>
              <td class="inventory-page__table-cell">{{ inventory.name }}</td>
              <td class="inventory-page__table-cell">
                {{ inventory.quantity }}
              </td>
              <td class="inventory-page__table-cell">
                {{ inventory.description }}
              </td>
              <td class="inventory-page__table-cell">
                {{ inventory.dateCreated }}
              </td>
              <td
                class="inventory-page__table-cell inventory-page__table-cell--actions"
              ></td>
            </tr>
            }
          </tbody>
        </table>
        }
      </div>
    </div>
  `,
  styles: `
     h1{font-size: 2em; }
    .form {width: 80%; text-align: center; margin: auto; padding: 1%;}
    .formInput {width: 30%;}
    .form_actions {margin-top: 2%;}
    .button{ margin-top: 1%; margin-bottom: 1%;}
    .inventory-page { max-width: 80%; margin: 0 auto; padding: 20px; }
    .inventory-page__title { text-align: center; color: #563d7c; }
    .inventory-page__table { width: 100%; border-collapse: collapse; }
    .inventory-page__table-header { background-color: #FFE484; color: #000; border: 1px solid black; padding: 5px; text-align: left; }
    .inventory-page__table-cell { border: 1px solid black; padding: 5px; text-align: left; }
    .inventory-page__table-cell--actions { text-align: center; }
  `,
})
export class InventoryByIdComponent {
  isTableVisible: boolean = false;
  inventoryItems: inventoryItems[] = [];

  itemForm: FormGroup= this.fb.group({
    _id: [null, Validators.required],
    supplierId: [null, Validators.required],
    name: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
    description: [null, Validators.compose([Validators.required, Validators.maxLength(500)])],
    price: [null, Validators.compose([Validators.required, Validators.min(0)])],
    quantity: [null, Validators.compose([Validators.required, Validators.min(0)])],
    dateModified: [null, Validators.required],
  });

  constructor(
    private inventoryService: InventoryService,
    private fb: FormBuilder
  ) {
    this.inventoryService.getInventory().subscribe({
      next: (inventory: inventoryItems[]) => {
        this.inventoryItems = inventory;
        console.log(`Inventory: ${JSON.stringify(this.inventoryItems)}`);
      },
      error: (err: any) => {
        console.error(`Error occurred while retrieving inventories: ${err}`);
      },
    });
  }

  ngAfterViewInit(): void {

  }
  
  onSubmit() {
    var _id = this.itemForm.controls['_id'].value;
    this.inventoryService
      .getInventoryById(_id)
      .subscribe({
        next: () => {
          console.log(`Inventory item with ID ${_id} found successfully`);
          this.inventoryItems = this.inventoryItems.filter(
            (i) => i._id == _id
          );
          console.log(`Inventory Item: ${JSON.stringify(this.inventoryItems)}`);
          this.isTableVisible = true;
        },
        error: (err: any) => {
          console.error(
            `Error occurred while finding inventory item with ID ${_id}: ${err}`
          );
        },
      });
  }
}
