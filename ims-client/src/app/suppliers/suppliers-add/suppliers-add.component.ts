/**
 * Author: Jake Seever
 * Date: 26 February 2025
 * File: suppliers-add.component.ts
 * Description: Adding a supplier component
 */

import { NgModule } from '@angular/core';
import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { SuppliersService } from '../suppliers.service';
import { CommonModule, NgIf } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators, FormGroup } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { supplierEntry } from '../suppliers';
//import { Suppliers} from '../suppliers'
import { AddSuppliersDTO } from '../suppliers';


@Component({
  selector: 'app-suppliers-add',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  template: `
  <div class= 'addInventory'>
     <h1 class='page-title'>Add Supplier</h1>
     <h4>Form to add a Supplier.</h4>
 
     <div class='page-card'>
       <form [formGroup]='supplierForm' class='supplierForm'>
         <div class='form-group'>
           <label for='supplierId' class ='form-label'>Suppler ID</label>
           <input type='number' id='supplierId' class= 'form-control' formControlName='supplierId'>
         </div>
 
         <div class='form-group'>
           <label for='supplierName' class ='form-label'>Supplier Name</label>
           <input type='text' id='supplierName' class= 'form-control' formControlName='supplierName'>
         </div>
 
         <div class='form-group'>
           <label for='contactInformation' class ='form-label'>Contact Information</label>
           <input type='text' id='contactInformation' class='form-control' formControlName='contactInformation'>
         </div>
 
         <div class='form-group'>
           <label for='supplierAddress' class ='form-label'>Address</label>
           <input type='text' id='address' class='form-control' formControlName='address'>
         </div>
 
         <div class='form-group'>
           <label for='dateCreated' class = 'form-label'>Date Created</label>
           <input type='datetime-local' id='dateCreated' class= 'form-control' formControlName='dateCreated'>
         </div>

         <br />

         <button type= 'submit' class='btn btn-primary' (click)='onSubmit()'>Add Supplier</button>
       </form>
     </div>
     <br />
     <a class='suppliers-list-link' routerLink='/suppliers'>View Suppliers List</a>
   </div>
   `,
   styles: `
   .supplierForm{ 
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
   .suppliers-list-link{
     display: block;
     margin-top: 20px;
     color: #800080;
   }
   .suppliers-list-link:hover{
     color: #4B0082;
     text-decoration: underline;
   }
   `
 })
 export class SuppliersAddComponent {
   supplierForm: FormGroup= this.fb.group({
     supplierId:[null, Validators.required],
     supplierName: [null, Validators.compose([Validators.required,Validators.minLength(3), Validators.maxLength(500)])],
     contactInformation:[null, Validators.compose([Validators.required, Validators.maxLength(500)])],
     address: [null, Validators.compose([Validators.required])],
     dateCreated: [null, Validators.required]
   });
 
   constructor(private fb: FormBuilder, private suppliersService: SuppliersService, private router: Router){}
 
   onSubmit(){
     if(this.supplierForm.valid){
       const dateCreated = new Date(this.supplierForm.controls['dateCreated'].value).toISOString();
       const formValue = this.supplierForm.value;
       const supplier: AddSuppliersDTO = {
         ...formValue,
         supplierId: Number(formValue.supplierId),
         supplierName: formValue.supplierName,
         contactInformation: formValue.contactInformation,
         address: formValue.address,
         dateCreated: dateCreated
       };
       console.log('New Supplier Added',supplier);
       this.suppliersService.addSupplierEntry(supplier).subscribe({
         next: (result: any) =>{
           console.log('Supplier Added', result.message);
           this.router.navigate(['/suppliers/add']);
         },
         error:(error) => {
           console.error(error);
         }
     });
     }
   }
 }
 