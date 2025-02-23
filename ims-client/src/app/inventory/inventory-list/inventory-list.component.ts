import { Component, OnInit} from '@angular/core';
import { InventoryService } from '../inventory.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-inventory-list',
  standalone: true,
  imports: [CommonModule],
  template:`
  <div>
  <h1>Inventory List</h1>
  <ul>
    <li *ngFor="let item of inventoryItems">
      {{item._id}} - {{item.name}} - {{item.supplierId}} - {{item.categoryId}} - {{item.price}} - {{item.quantity}}
    </li>
  </ul>
  </div>`,
  styles: ``
})
export class InventoryListComponent implements OnInit{
 inventoryItems: any[] = [];
  inventory: any;

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.loadInventory();
  }

  private loadInventory(): void {
    this.inventoryService.getInventory().subscribe(
      (data: any[]) => {
        this.inventoryItems = data;
      },
      (error: any) => {
        console.error('Error fetching inventory', error);
      }
    );
  }
}

