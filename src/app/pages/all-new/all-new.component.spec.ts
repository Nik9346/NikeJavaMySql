import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllNewComponent } from './all-new.component';

describe('AllNewComponent', () => {
  let component: AllNewComponent;
  let fixture: ComponentFixture<AllNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllNewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
