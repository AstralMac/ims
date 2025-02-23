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
          id="searchTerm"
          name="searchTerm"
          placeholder="Enter your name search"
          formControlName="searchTerm"
        />
        <div class="form__actions">
          <button class="button button--primary" type="submit">Find Items</button>
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
export class InventorySearchComponent {
  isTableVisible: boolean = false;
  searchTerm: string = '';
  inventoryItems: inventoryItems[] = [];
  item: any[] = [];

  itemForm = this.fb.group({
    searchTerm: [null, Validators.compose([Validators.required])],
  });

  constructor(
    private inventoryService: InventoryService,
    private fb: FormBuilder
  ) {
    this.inventoryService.getInventory().subscribe({
      next: (inventory: inventoryItems[]) => {
        this.inventoryItems = inventory;
        console.log(`Inventory items: ${JSON.stringify(this.inventoryItems)}`);
      },
      error: (err: any) => {
        console.error(`Error occurred while retrieving inventories: ${err}`);
      },
    });
  }

  ngAfterViewInit(): void {
    // No need to create the table here, it will be handled by tableComponent
  }
  onSubmit() {
    var searchTerm = this.itemForm.controls['searchTerm'].value;
    //console.log(_Id);
    console.log(searchTerm);
    console.log(typeof searchTerm);

    this.inventoryService
      .searchInventory("Computer")
      .subscribe({
        next: () => {
          //console.log(this.itemID);
          console.log(`Inventory item with ${searchTerm} found successfully`);
          this.inventoryItems = this.inventoryItems.filter(
            (i) => i.name?.includes(this.searchTerm)
          );
          //this.item.push(result);
          console.log(this.searchTerm);
          console.log(`Inventory Items: ${JSON.stringify(this.inventoryItems)}`);
          this.isTableVisible = true;
        },
        error: (err: any) => {
          console.error(
            `Error occurred while finding inventory item using this search term ${searchTerm}: ${err}`
          );
        },
      });
  }
}
