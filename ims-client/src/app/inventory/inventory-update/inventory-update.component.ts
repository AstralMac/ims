import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import{ActivatedRoute, Router, RouterLink} from '@angular/router';
import { InventoryService } from '../inventory.service';
import { UpdateInventoryDTO } from '../inventory';

@Component({
  selector: 'app-inventory-update',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  template: `
  <div class= 'updateInventory'>
    <h1 class='page-title'>Update Inventory Item</h1>
    <h4>Update pre-existing items in the inventory</h4>
    <div class='updateInventory'>
      <form [formGroup]='inventoryForm' class='updateInventoryForm'>
        <div class='form-group'>
          <label for='_id' class = 'form-label'>ID</label>
          <input type='text' id='_id' class= 'form-control' formControlName='_id'>
        </div>

        <div class='form-group'>
          <label for='supplierId' class='form-label'>Supplier ID</label>
          <input type='number' id='supplierId' class='form-control' formControlName='supplierId'>
        </div>

         <div class='form-group'>
          <label for='name' class='form-label'>Name</label>
          <input type='text' id='name' class='form-control' formControlName='name'>
        </div>

         <div class='form-group'>
          <label for='description' class='form-label'>Description</label>
          <textarea id='description' rows= '10' class='form-control' formControlName='description'></textarea>
        </div>

         <div class='form-group'>
          <label for='price' class='form-label'></label>
          <input type='number' id='price' class='form-control' formControlName='price'>
        </div>
         <div class='form-group'>
          <label for='quantity' class='form-label'></label>
          <input type='number' id='quantity' class='form-control' formControlName='quantity'>
        </div>

         <div class='form-group'>
          <label for='dateModified' class='form-label'>Date Modified</label>
          <input type='datetime-local' id='dateModified' class='form-control' formControlName='dateModified'>
        </div>
        <br />
        <button type='submit' class='btn btn-primary' (click)='onSubmit()'>Update Inventory</button>
      </form>
    </div>
    <br />
    <a class='inventory-list-link' routerLink='/inventory'>View Inventory List</a>
  </div>


  `,
  styles: `
  .updateInventory{
    margin: 20px auto;
    max-width: 800px;
    padding: 20px;
    display: flex;
   flex-direction: column;
  }
  .page-title{
    text-align: center;
    margin-bottom: 20px;
  }
  .page-card{
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-top: 20px;
  }
  .form-group{
    margin-bottom: 20px;
  }
  .form-label{
    display: block;
    margin-bottom: 5px;
  }
  .form-control{
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  .btn-primary{
    padding: 10px 20px;
    font-size: 16px;
    background-color: #800080;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  .btn-primary:hover{
    background-color: #4B0082;
  }
  .inventory-list-link{
    display: block;
    text-align: center;
    margin-top: 20px;
    color: #0000ff;
  }
  .inventory-list-link:hover{
    text-decoration: underline;
  }
  `
})
export class InventoryUpdateComponent {
inventoryForm: FormGroup= this.fb.group({
  _id: [null, Validators.required],
  supplierId: [null, Validators.required],
  name: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
  description: [null, Validators.compose([Validators.required, Validators.maxLength(500)])],
  price: [null, Validators.compose([Validators.required, Validators.min(0)])],
  quantity: [null, Validators.compose([Validators.required, Validators.min(0)])],
  dateModified: [null, Validators.required],
});

constructor(private fb: FormBuilder, private inventoryService: InventoryService, private router: Router, private route: ActivatedRoute) {}

onSubmit(){
  if(this.inventoryForm.valid){
    const dateModified = new Date(this.inventoryForm.controls['dateModified'].value).toISOString();
    const formValue = this.inventoryForm.value;
    const updateInventorySchema: UpdateInventoryDTO = {
      ...formValue,
      supplierId: (formValue.supplierId),
      name: formValue.name,
      description: formValue.description,
      quantity: Number(formValue.quantity),
      price: Number(formValue.price),
      dateModified,
    };

    if(!formValue._id){
      console.error('Error: _id is required to update inventory item');
      return;
    }
    console.log('Inventory Item has been updated', updateInventorySchema);

    if(this.inventoryForm.invalid){
      return;
    }
    this.inventoryService.updateInventoryItem(updateInventorySchema, formValue._id).subscribe({
      next: () => {
        this.router.navigate(['/inventory']);
      },
      error: (error) => {
        console.error('Error updating item');
      },
    });
}
}
}
