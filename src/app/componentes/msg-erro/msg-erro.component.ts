import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-msg-erro',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './msg-erro.component.html',
  styleUrl: './msg-erro.component.css'
})
export class MsgErroComponent {
  @Input() control!: FormControl
}
