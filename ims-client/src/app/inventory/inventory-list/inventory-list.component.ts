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
      <ul>
        <li *ngFor="let item of inventoryItems">
          {{item._id}} - {{item.name}} - {{item.supplierId}} - {{item.categoryId}} - {{item.price}} - {{item.quantity}}
        </li>
      </ul>
    </div>

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
  `,
  styles: ``
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
