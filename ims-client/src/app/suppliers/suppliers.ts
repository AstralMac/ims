/**
 * Author: Malcolm Abdullah
 * date: February 17th, 2025
 * File: inventory.ts
 * Description Interface for supplierEntry
 */

export interface supplierEntry{
  _id?: string;
  supplierId?: number;
  supplierName?: string;
  contactInformation?: string;
  address?: string;
  dateCreated?: string | Date;
  dateModified?: string | Date;
}
export type UpdateSuppliersDTO = Omit<supplierEntry, 'dateCreated'|'categoryId'>;

export type AddSuppliersDTO = Omit<supplierEntry, '_id'| 'dateModified'>;
