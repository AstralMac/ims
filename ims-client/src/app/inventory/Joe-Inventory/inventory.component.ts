import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../inventory.service';
import { CommonModule } from '@angular/common'; // Import CommonModule here for ngFor

@Component({
  selector: 'app-inventory',
  standalone: true, // This is a standalone component
  imports: [CommonModule], // Import CommonModule to use directives like ngFor
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
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
