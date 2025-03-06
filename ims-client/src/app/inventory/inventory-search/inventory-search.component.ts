/**
 * Author: Jake Seever
 * Date: 21 February 2025
 * File: inventory-search.js
 * Description: The inventory search component
 */

import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { CommonModule, NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { inventoryItems } from '../inventory';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-inventory-seacrch',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  template: `
    <div class="item-container">
      <h1>Search Inventory Items By Name</h1>
      <form class="form" [formGroup]="itemForm" (ngSubmit)="onSubmit()">
        <input
          class="formInput"
          type="text"
          id="name"
          name="name"
          placeholder="Enter your name search"
          formControlName="name"
        />
        <div class="form__actions">
          <button class="button button--primary" type="submit">
            Find Items
          </button>
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
              <th class="inventory-page__table-header">Price</th>
              <th class="inventory-page__table-header">Description</th>
              <th class="inventory-page__table-header">Date Added</th>
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
                {{ '$' + inventory.price }}
              </td>
              <td class="inventory-page__table-cell">
                {{ inventory.description }}
              </td>
              <td class="inventory-page__table-cell">
                {{ inventory.dateCreated }}
              </td>
            </tr>
            }
          </tbody>
        </table>
        }
      </div>
    </div>
    <div *ngIf="isMessageVisible">
      <h3>{{ this.errMessage }}</h3>
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
export class InventorySearchComponent implements AfterViewInit {
  isTableVisible: boolean = false;
  isMessageVisible: boolean = false;
  errMessage: string = '';
  inventoryItems: inventoryItems[] = [];

  itemForm: FormGroup = this.fb.group({
    _id: [null, Validators.required],
    supplierId: [null, Validators.required],
    name: [
      null,
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ]),
    ],
    description: [
      null,
      Validators.compose([Validators.required, Validators.maxLength(500)]),
    ],
    price: [null, Validators.compose([Validators.required, Validators.min(0)])],
    quantity: [
      null,
      Validators.compose([Validators.required, Validators.min(0)]),
    ],
    dateModified: [null, Validators.required],
  });

  constructor(
    private inventoryService: InventoryService,
    private fb: FormBuilder
  ) {}

  ngAfterViewInit(): void {}

loadInventory() {
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

  onSubmit() {
    this.isTableVisible = false;
    this.isMessageVisible = false;
    const name = this.itemForm.controls['name'].value;

    if (name != null) {
      this.loadInventory();
      name.trim();
    }
    this.inventoryService.searchInventory(name).subscribe({
      next: () => {
        if (name != null) {
          this.inventoryItems = this.inventoryItems.filter(
            (i) => i.name == name
          );
          if (this.inventoryItems.length > 0) {
            console.log(
              `Inventory item with name of ${name} found successfully`
            );
            this.isTableVisible = true;
            console.log(
              `Inventory Items: ${JSON.stringify(this.inventoryItems)}`
            );
            this.itemForm.reset();
            this.isMessageVisible = false;
          } else {
            this.errMessage =
              'Inventory item with that name could not be found';
            this.isMessageVisible = true;
            this.itemForm.reset();
            console.log(this.errMessage);
          }
        } else {
          this.errMessage = 'Item name cannot be empty';
          this.isMessageVisible = true;
          console.log(this.errMessage);
        }
      },
      error: (err: any) => {
        console.error('Error occurred while finding inventory with that name');
      },
    });
  }
}
