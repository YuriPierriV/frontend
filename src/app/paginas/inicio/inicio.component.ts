import { Component } from '@angular/core';
import { HeaderComponent } from '../../componentes/header/header.component';
import { MainImageComponent } from '../../componentes/main-image/main-image.component';
import { CardComponent } from '../../componentes/card/card.component';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    HeaderComponent,
    MainImageComponent,
    CardComponent,
    RouterLink
],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

}
