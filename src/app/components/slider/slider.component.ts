import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../models/movie';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
  animations:[
    trigger('slideFade', [
      state('void', style({opacity : 0})),
      transition('void <=> *', [animate('500ms')]),
    ]),
  ],
})
export class SliderComponent implements OnInit{
  currentSlideIndex : number = 0;
  @Input() items : Movie[] = [];
  ngOnInit(): void {
    setInterval(() => {
      this.currentSlideIndex = ++ this.currentSlideIndex % this.items.length;
    }, 5000)
  }
}
