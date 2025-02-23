import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import{Router, RouterLink} from '@angular/router';
import { InventoryService } from '../inventory.service';
import { AddInventoryDTO } from '../../inventory/inventory';



@Component({
  selector: 'app-inventory-add',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  template: `
  <div class= 'addInventory'>
    <h1 class='page-title'>Add Inventory Item</h1>
    <h4>Form to add items to inventory.</h4>

    <div class='page-card'>
      <form [formGroup]='inventoryForm' class='addInventoryForm'>
        <div class='form-group'>
          <label for='supplierId' class = 'form-label'>Suppler ID</label>
          <input type='number' id='supplierId' class= 'form-control' formControlName='supplierId'>
        </div>

        <div class='form-group'>
          <label for='categoryId' class = 'form-label'>Category ID</label>
          <input type='number' id='categoryId' class= 'form-control' formControlName='categoryId'>
        </div>

        <div class='form-group'>
          <label for='name' class = 'form-label'>Name</label>
          <input type='text' id='name' class= 'form-control' formControlName='name'>
        </div>

        <div class='form-group'>
          <label for='description' class = 'form-label'>Description</label>
          <textarea id='description' rows= '10' class= 'form-control' formControlName='description'></textarea>
        </div>

        <div class='form-group'>
          <label for='price' class = 'form-label'>Price</label>
          <input type='number' id='price' class= 'form-control' formControlName='price'>
        </div>

        <div class='form-group'>
          <label for='quantity' class = 'form-label'>Quantity</label>
          <input type='number' id='quantity' class= 'form-control' formControlName='quantity'>
        </div>

        <div class='form-group'>
          <label for='dateCreated' class = 'form-label'>Date Created</label>
          <input type='datetime-local' id='dateCreated' class= 'form-control' formControlName='dateCreated'>
        </div>
        <br />
        <button type= 'submit' class='btn btn-primary' (click)='onSubmit()'>Add To Inventory</button>
      </form>
    </div>
    <br />
    <a class='inventory-list-link' routerLink='/inventory'>View Inventory List</a>
  </div>
  `,
  styles: `
  .addInventory{
    margin: 20px;
  }
  .page-title{
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

  .btn-primary:active{
    background-color: #800080;
  }
  .inventory-list-link{
    display: block;
    margin-top: 20px;
    color: #800080;
  }
  .inventory-list-link:hover{
    color: #4B0082;
    text-decoration: underline;
  }
  `
})
export class InventoryAddComponent {
  inventoryForm: FormGroup= this.fb.group({
    supplierId:[null, Validators.required],
    categoryId:[null, Validators.required],
    name:[null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
    description: [null, Validators.compose([Validators.required, Validators.maxLength(500)])],
    quantity: [null, Validators.compose([Validators.required, Validators.min(0)])],
    price: [null, Validators.compose([Validators.required, Validators.min(0)])],
    dateCreated: [null, Validators.required]
  });

  constructor(private fb: FormBuilder, private inventoryService: InventoryService, private router: Router){}

  onSubmit(){
    if(this.inventoryForm.valid){
      const dateCreated = new Date(this.inventoryForm.controls['dateCreated'].value).toISOString();
      const formValue = this.inventoryForm.value;
      const inventoryItems: AddInventoryDTO = {
        ...formValue,
        supplierId: Number(formValue.supplierId),
        categoryId: Number(formValue.categoryId),
        name: formValue.name,
        description: formValue.description,
        quantity: Number(formValue.quantity),
        price: Number(formValue.price),
        dateCreated
      };
      console.log('New Inventory Item Added',inventoryItems);
      this.inventoryService.addInventoryItem(inventoryItems).subscribe({
        next: (result: any) =>{
          console.log('Inventory Item Added', result.message);
          this.router.navigate(['/inventory']);
        },
        error:(error) => {
          console.error(error);
        }
    });
    }
  }
}
