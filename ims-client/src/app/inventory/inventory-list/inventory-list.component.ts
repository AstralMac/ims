import { Component } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { inventoryItems } from '../inventory';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventory-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <h1>Inventory List</h1>
     <!-- <ul>
        <li *ngFor="let item of inventoryItems">
          {{item._id}} - {{item.name}} - {{item.supplierId}} - {{item.categoryId}} - {{item.price}} - {{item.quantity}}
        </li>
      </ul>
      -->
    </div>
    <div class="inventory-page">
    <table class="inventory-page__table">
      <thead class="inventory-page__table-head">
        <tr class="inventory-page__table-row">
          <th class="inventory-page__table-header">Item ID</th>
          <th class="inventory-page__table-header">Name</th>
          <th class="inventory-page__table-header">Supplier ID</th>
          <th class="inventory-page__table-header">Category ID</th>
          <th class="inventory-page__table-header">Price</th>
          <th class="inventory-page__table-header">Quantity</th>
        </tr>
      </thead>
      <tbody class="inventory-page__table-body">
        @for (inventory of inventoryItems; track inventory) {
          <tr class="inventory-page__table-row">
            <td class="inventory-page__table-cell">{{ inventory._id }}</td>
            <td class="inventory-page__table-cell">{{ inventory.name }}</td>
            <td class="inventory-page__table-cell">{{ inventory.supplierId }}</td>
            <td class="inventory-page__table-cell">{{ inventory.categoryId }}</td>
            <td class="inventory-page__table-cell">{{ inventory.price }}</td>
            <td class="inventory-page__table-cell">{{ inventory.quantity }}</td>
          </tr>
        }
      </tbody>
    </table>
    </div>
  `,
  styles: `
    .inventory-page {
    max-width: 80%;
    margin: 0 auto;
    padding: 20px;
    }
    .inventory-page__title {
    text-align: center;
    color: #563d7c;
    }
    .inventory-page__table {
    width: 100%;
    border-collapse: collapse;
    }
    .inventory-page__table-header {
    background-color: #FFE484;
    color: #000;
    border: 1px solid black;
    padding: 5px;
     text-align: left;
    }
    .inventory-page__table-cell {
    border: 1px solid black;
    padding: 5px;
    text-align: left;
    }
    .inventory-page__table-cell--actions {
    text-align: center;
    }
    .inventory-page__icon-link {
    cursor: pointer;
    color: #6c757d;
    text-decoration: none;
    margin: 0 5px;
    }
    .inventory-page__icon-link:hover {
    color: #000;
    }
    .inventory-page__no-items {
    text-align: center;
    color: #6c757d;
    }
    .inventory-page__button {
    background-color: #563d7c;
    color: #fff;
    border: none;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    margin: 10px 2px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s;
    }
    .inventory-page__button:hover {
    background-color: #6c757d;
    }
    .message-alert {
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid transparent;
    border-radius: 4px;
    color: #a94442;
    background-color: #f2dede;
    border-color: #ebccd1;
    }
    .message-success {
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
export class InventoryListComponent {
  inventoryItems: inventoryItems[] = [];

  constructor(private inventoryService: InventoryService) {
    this.inventoryService.getInventory().subscribe({
      next: (inventoryItems: inventoryItems[]) => {
        this.inventoryItems = inventoryItems;
        console.log(`Inventory Items: ${JSON.stringify(this.inventoryItems)}`);
      },
      error: (err: any) => {
        console.error(`Error occurred while retrieving inventories: ${err}`);
      }
    });
  }
}
