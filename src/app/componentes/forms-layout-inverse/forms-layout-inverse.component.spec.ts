import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsLayoutInverseComponent } from './forms-layout-inverse.component';

describe('FormsLayoutInverseComponent', () => {
  let component: FormsLayoutInverseComponent;
  let fixture: ComponentFixture<FormsLayoutInverseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsLayoutInverseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormsLayoutInverseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
