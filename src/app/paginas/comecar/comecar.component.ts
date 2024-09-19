import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormsLayoutComponent } from "../../componentes/forms-layout/forms-layout.component";
import { RouterLink } from '@angular/router';
import { GoogleComponent } from '../../componentes/google/google.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import Swiper from 'swiper';


import { register } from 'swiper/element/bundle';

register();

declare var google:any;

@Component({
  selector: 'app-comecar',
  standalone: true,
  imports: [
    GoogleComponent,
    FormsLayoutComponent,
    RouterLink
  ],
  templateUrl: './comecar.component.html',
  styleUrl: './comecar.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComecarComponent {
  
}
