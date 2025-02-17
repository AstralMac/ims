import { InventoryService } from '../inventory.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InventoryListComponent } from './inventory-list.component';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';

describe('InventoryListComponent', () => {
  let component: InventoryListComponent;
  let fixture: ComponentFixture<InventoryListComponent>;
  let InventoryService: InventoryService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryListComponent, Http]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
