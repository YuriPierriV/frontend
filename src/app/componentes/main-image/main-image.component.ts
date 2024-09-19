import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxTypedJsModule } from 'ngx-typed-js';
import { ImageCarrosselComponent } from "../image-carrossel/image-carrossel.component";



@Component({
  selector: 'app-main-image',
  standalone: true,
  imports: [
    CommonModule,
    NgxTypedJsModule,
    ImageCarrosselComponent
  ],
  templateUrl: './main-image.component.html',
  styleUrls: ['./main-image.component.css']
})
export class MainImageComponent {
  
}
