import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersSearchComponent } from './suppliers-search.component';

describe('SuppliersSearchComponent', () => {
  let component: SuppliersSearchComponent;
  let fixture: ComponentFixture<SuppliersSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuppliersSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuppliersSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
