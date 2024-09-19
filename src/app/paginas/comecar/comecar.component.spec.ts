import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComecarComponent } from './comecar.component';

describe('ComecarComponent', () => {
  let component: ComecarComponent;
  let fixture: ComponentFixture<ComecarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComecarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComecarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
