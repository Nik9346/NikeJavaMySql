import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageShoesComponent } from './manage-shoes.component';

describe('ManageShoesComponent', () => {
  let component: ManageShoesComponent;
  let fixture: ComponentFixture<ManageShoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageShoesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageShoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
