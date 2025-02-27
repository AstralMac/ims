import { SuppliersService } from './../suppliers.service';
import { supplierEntry } from './../suppliers';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-suppliers-list',
  standalone: true,
  imports: [CommonModule],
  template: `
   <div>
    <h1>Suppliers List</h1>
</div>
<div class="Suppliers-page">
<table class="suppliers-page__table">
  <thead class="suppliers-page__table-head">
    <tr>
    <th class="suppliers-page__table-header">supplier ID</th>
    <th class="suppliers-page__table-header">Name</th>
    <th class="suppliers-page__table-header">contactInformation</th>
    <th class="suppliers-page__table-header">address</th>
    </tr>
  </thead>
  <tbody class="supplies-page__table-body">
    @for (supplier of suppliersList; track supplier) {
      <tr class="suppliers-page__table-row">
        <td class="suppliers-page__table-cell">{{ supplier._id }}</td>
        <td class="suppliers-page__table-cell">{{ supplier.supplierName }}</td>
        <td class="suppliers-page__table-cell">{{ supplier.contactInformation }}</td>
        <td class="suppliers-page__table-cell">{{ supplier.address }}</td>
      </tr>
    }
  </tbody>
</table>
</div>
`,
  styles: `
  .suppliers-page {
    max-width: 80%;
    margin: 0 auto;
    padding: 20px;
  }
  .suppliers-page__table {
    width: 100%;
    border-collapse: collapse;
  }
  .suppliers-page__table-header {
    background-color: #FFE484;
    color: #000;
    border: 1px solid black;
    padding: 5px;
    text-align: left;
  }
  .suppliers-page__table-cell {
    border: 1px solid black;
    padding: 5px;
    text-align: left;
  }
  `
})
export class SuppliersListComponent implements OnInit {
  suppliersList: supplierEntry[] = [];

  constructor(private suppliersService: SuppliersService) {}

  ngOnInit(): void {
    this.suppliersService.getSuppliers().subscribe({
      next: (suppliers: supplierEntry[]) => {
        this.suppliersList = suppliers;
        console.log(`suppliers list: ${JSON.stringify(this.suppliersList)}`);
      },
      error: (err: any) => {
        console.error(`Error occurred while retrieving suppliers: ${err}`);
      }
    });
  }
}
