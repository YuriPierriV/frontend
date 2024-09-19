import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import Swiper from 'swiper';

// import function to register Swiper custom elements
import { register } from 'swiper/element/bundle';
// register Swiper custom elements
register();

@Component({
  selector: 'app-image-carrossel',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './image-carrossel.component.html',
  styleUrls: ['./image-carrossel.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ImageCarrosselComponent implements AfterViewInit {
  ngAfterViewInit() {
    new Swiper('.mySwiper', {
      autoplay:{
        delay: 2500,
        disableOnInteraction: false,
      },
      slidesPerView: 3,
      spaceBetween: 10,
      loop: true,
      mousewheel: true,
      grabCursor: true,
    });
  }
}
