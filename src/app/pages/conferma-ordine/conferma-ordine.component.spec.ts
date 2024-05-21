import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfermaOrdineComponent } from './conferma-ordine.component';

describe('ConfermaOrdineComponent', () => {
  let component: ConfermaOrdineComponent;
  let fixture: ComponentFixture<ConfermaOrdineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfermaOrdineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfermaOrdineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
