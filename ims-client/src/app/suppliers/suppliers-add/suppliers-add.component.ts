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
 export class SuppliersAddComponent { // Export the supplierForm group with validators.
   supplierForm: FormGroup= this.fb.group({
     supplierName: [null, Validators.compose([Validators.required,Validators.minLength(3), Validators.maxLength(100)])],
     contactInformation:[null, Validators.compose([Validators.required, Validators.maxLength(500)])],
     address: [null, Validators.compose([Validators.required])],
   });
 
   constructor(private fb: FormBuilder, private suppliersService: SuppliersService, private router: Router){}
 
   onSubmit(){
     if(this.supplierForm.valid){
       const formValue = this.supplierForm.value; // set the form values variable to the supplierForm values. 
       const supplier: AddSuppliersDTO = { // create the data transfer object and set the values to the ones entered on the form.
         ...formValue,
         supplierName: formValue.supplierName,
         contactInformation: formValue.contactInformation,
         address: formValue.address,
       };
       console.log('New Supplier Added',supplier); // Confirm the new supplier was added and console the values.
       this.suppliersService.addSupplierEntry(supplier).subscribe({ //Subscribe to the add supplier entry and pass in the supplier object.
         next: (result: any) =>{
           console.log('Supplier Added', result.message);
           this.router.navigate(['/suppliers/add']); 
         },
         error:(error) => {
           console.error(error); //Console any error message.
         }
     });
     }
     this.supplierForm.reset(); // Empty the form values once the new supplier is added.
   }
 }
 