import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOrderProductComponent } from './card-order-product.component';

describe('CardOrderProductComponent', () => {
  let component: CardOrderProductComponent;
  let fixture: ComponentFixture<CardOrderProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardOrderProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardOrderProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
