import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of,throwError  } from 'rxjs';
import { InventoryService } from '../inventory.service';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { InventoryAddComponent } from './inventory-add.component';

describe('InventoryAddComponent', () => {
  let component: InventoryAddComponent;
  let fixture: ComponentFixture<InventoryAddComponent>;
  let inventoryService: InventoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have a valid form when all fields are filled in correctly', () =>{

  });

  it('should call addInventoryItem and navigate on successful form submission', () =>{

  });

  it('Should handle error on form submission failure',()=>{

  });
});
