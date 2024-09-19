import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCarrosselComponent } from './image-carrossel.component';

describe('ImageCarrosselComponent', () => {
  let component: ImageCarrosselComponent;
  let fixture: ComponentFixture<ImageCarrosselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageCarrosselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImageCarrosselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
