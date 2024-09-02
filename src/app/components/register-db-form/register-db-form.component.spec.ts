import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterDbFormComponent } from './register-db-form.component';

describe('RegisterDbFormComponent', () => {
  let component: RegisterDbFormComponent;
  let fixture: ComponentFixture<RegisterDbFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegisterDbFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterDbFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
