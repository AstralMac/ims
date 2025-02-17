/**
 * Author: Jake Seever
 * Date: 15 February 2025
 * File: inventory-by-id.js
 * Description: The inventory by id component
 */


import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inventory-by-id',
  standalone: true,
  imports: [],
  template: `
    <p>
      inventory-by-id works!
    </p>
  `,
  styles: ``
})
export class InventoryByIdComponent {

}
