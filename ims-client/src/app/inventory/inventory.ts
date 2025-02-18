/**
 * Author: Malcolm Abdullah
 * date: February 17th, 2025
 * File: inventory.ts
 * Description Interface for inventoryitems
 */

export interface inventoryItems{
  _id: string;
  supplierId: number;
  categoryId: number;
  name: string;
  description?: string;
  quantity: number;
  price: number;
  dateCreated?: string;
  dateModified?: string;
}
export type UpdateInventoryDTO = Omit<inventoryItems, '_id'| 'dateCreated'| 'dateModified'|'categoryId'>;

export type AddInventoryDTO = Omit<inventoryItems, '_id'| 'dateModified'>;
