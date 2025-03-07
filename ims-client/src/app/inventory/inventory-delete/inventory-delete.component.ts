import { Component } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { inventoryItems } from '../inventory';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router} from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-inventory-delete',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  template: `
    <div class="inventory-page">
      <h1 class="inventory-page__title">Inventory List</h1>
      <button class="inventory-page__button" routerLink="/inventory/add">Add Inventory</button>

      @if (serverMessage) {
        <div [ngClass]="{'message-alert': serverMessageType === 'error', 'message-success': serverMessageType === 'success'}">
          {{ serverMessage }}
        </div>
      }

      @if (inventories && inventories.length > 0) {
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
            @for (inventory of inventories; track inventory) {
              <tr class="inventory-page__table-row">
                <td class="inventory-page__table-cell">{{ inventory._id }}</td>
                <td class="inventory-page__table-cell">{{ inventory.name }}</td>
                <td class="inventory-page__table-cell">{{ inventory.quantity }}</td>
                <td class="inventory-page__table-cell">{{ inventory.description }}</td>
                <td class="inventory-page__table-cell">{{ inventory.dateCreated }}</td>
                <td class="inventory-page__table-cell inventory-page__table-cell--actions">
                  <a (click)="deleteInventory(inventory._id || '')" class="inventory-page__icon-link">
                    <i class="fas fa-trash-alt"></i>
                  </a>
                </td>
              </tr>
            }
          </tbody>
        </table>
      }
      @else {
        <p class="inventory-page__no-items">No inventory items found, consider adding one...</p>
      }
    </div>
  `,
  styles: `
    .inventory-page { max-width: 80%; margin: 0 auto; padding: 20px; }
    .inventory-page__title { text-align: center; color: #563d7c; }
    .inventory-page__table { width: 100%; border-collapse: collapse; }
    .inventory-page__table-header { background-color: #FFE484; color: #000; border: 1px solid black; padding: 5px; text-align: left; }
    .inventory-page__table-cell { border: 1px solid black; padding: 5px; text-align: left; }
    .inventory-page__table-cell--actions { text-align: center; }
    .inventory-page__icon-link { cursor: pointer; color: #6c757d; text-decoration: none; margin: 0 5px; font-size: 18px;  /* Ensure the icon is visible */}
    .inventory-page__icon-link:hover { color: #000; }
    .inventory-page__no-items { text-align: center; color: #6c757d; }
    .inventory-page__button { background-color: #563d7c; color: #ffff00; border: none; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; margin: 10px 2px; cursor: pointer; border-radius: 5px; transition: background-color 0.3s; }
    .inventory-page__button:hover { background-color: #6c757d; }
    .message-alert { padding: 15px; margin-bottom: 20px; border: 1px solid transparent; border-radius: 4px; color: #a94442; background-color: #f2dede; border-color: #ebccd1; }
    .message-success { padding: 15px; margin-bottom: 20px; border: 1px solid transparent; border-radius: 4px; color: #3c763d; background-color: #dff0d8; border-color: #d6e9c6; }
  `
})
export class InventoryDeleteComponent {
  inventories: inventoryItems[] = [];
  serverMessage: string | null = null;
  serverMessageType: 'success' | 'error' | null = null;

  constructor(private inventoryService: InventoryService, private fb: FormBuilder, private route: ActivatedRoute) {
    this.inventoryService.getInventory().subscribe({
      next: (inventories: inventoryItems[]) => {
        this.inventories = inventories;
        console.log(`Inventories: ${JSON.stringify(this.inventories)}`);
      },
      error: (err: any) => {
        console.error(`Error occurred while retrieving inventories: ${err}`);
      }
    });
  }

  deleteInventory(_Id: string) {
    if (!confirm('Are you sure you want to delete this inventory item?')) {
      return;
    }
    this.inventoryService.deleteInventoryItem(_Id).subscribe({
      next: () => {
        console.log(`Inventory item with ID ${_Id} deleted successfully`);
        this.inventories = this.inventories.filter(i => i._id !== _Id);
        this.serverMessageType = 'success';
        this.serverMessage = `Inventory item with ID ${_Id} deleted successfully`;
        this.clearMessageAfterDelay();
      },
      error: (err: any) => {
        console.error(`Error occurred while deleting inventory item with ID ${_Id}: ${err}`);
        this.serverMessageType = 'error';
        this.serverMessage = `Error occurred while deleting inventory item with ID ${_Id}. Please try again later.`;
        this.clearMessageAfterDelay();
      }
    });
  }

  private clearMessageAfterDelay() {
    setTimeout(() => {
      this.serverMessage = null;
      this.serverMessageType = null;
    }, 3000);
  }
}
