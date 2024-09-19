import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgErroComponent } from './msg-erro.component';

describe('MsgErroComponent', () => {
  let component: MsgErroComponent;
  let fixture: ComponentFixture<MsgErroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MsgErroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MsgErroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
