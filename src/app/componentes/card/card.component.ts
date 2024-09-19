import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { gsap } from 'gsap';
import { trigger, state, style, transition, animate, sequence, AUTO_STYLE,  } from '@angular/animations';
import { timeInterval } from 'rxjs';

const DEFAULT_DURATION = 500;

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CommonModule,

  ],
  animations: [
    trigger('bodycard', [
      state('false', style({ height: '100px', 'font-size': "12px" })),
      state('true', style({ height: '0px', 'font-size': '0px' })),
      transition('false => true',
        sequence([
          animate('200ms ease-out', style({ 'font-size': '0px' })),
          animate('200ms ease-out', style({ height: '0px' }))
        ])
      ),
      transition('true => false',
        sequence([
          animate('200ms ease-in', style({ height: '100px' })),
          animate('200ms ease-in', style({ 'font-size': '12px' }))
        ])
      )
    ]),
    trigger('imgcard', [
      state('false', style({ height: '300px' })),
      state('true', style({ height: '400px' })),
      transition('false => true', animate('300ms ease-out')),
      transition('true => false', animate('300ms ease-in'))
    ]),
    trigger('botao', [
      state('false', style({ visibility: 'hidden', width: '0%' })),
      state('true', style({ visibility: 'inherit', width: '100%' })),
      transition('false => true', animate('300ms ease-in')),
      transition('true => false', animate('200ms ease-in'))
    ])
  ],
  
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
  @Input() imagem: string = '';
  @Input() title: string = '';
  @Input() text: string = '';
  hover = false;
  generatedClass: string = '';
  collapsed = true;
  botaos = false;

  ngOnInit(): void {
    this.generatedClass = this.generateClass(this.title);
  }

  abrir() {
    this.hover = true;
    this.collapsed = false;
    setTimeout(() => {
      if(this.hover){
        this.collapsed = false;
        this.botaos = true
      }
    }, 700);
  }

  fechar() {
    this.hover = false;
    this.botaos = false;
    setTimeout(() => {
      this.collapsed = true;
    }, 300);
    
  }

  generateClass(title: string): string {
    return title.replace(/\s+/g, '-');
  }
}