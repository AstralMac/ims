import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InventoryAddComponent } from './inventory/inventory-add/inventory-add.component';
import { InventoryByIdComponent } from './inventory/inventory-by-id/inventory-by-id.component';
import { InventoryDeleteComponent } from './inventory/inventory-delete/inventory-delete.component';
import { InventoryListComponent } from './inventory/inventory-list/inventory-list.component';
import { InventorySearchComponent } from './inventory/inventory-search/inventory-search.component';
import { InventoryUpdateComponent } from './inventory/inventory-update/inventory-update.component';
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'inventory',
    component: InventoryListComponent
  },
  {
    path: 'inventory/add',
    component: InventoryAddComponent
  },
  {
    path: 'inventory/by-id',
    component: InventoryByIdComponent
  },
  {
    path: 'inventory/search',
    component: InventorySearchComponent
  },
  {
    path: 'inventory/update',
    component: InventoryUpdateComponent
  },
  {
    path: 'inventory/delete',
    component: InventoryDeleteComponent
  }
];
