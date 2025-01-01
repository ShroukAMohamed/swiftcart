import { Component } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { RouterLink } from '@angular/router';
import { TopCategoriesComponent } from '../components/top-categories/top-categories.component';
import { OffersComponent } from '../components/offers/offers.component';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, RouterLink, TopCategoriesComponent,OffersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  animations: [
    trigger('fadeIn', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('hidden => visible', [
        animate('0.6s ease-in-out')
      ])
    ]),
    trigger('fadeDown', [
      state('void', style({ opacity: 0, transform: 'translateY(-80px)' })),
      transition('void => visible', [
        animate(
          '0.6s ease-in-out',
          keyframes([
            style({ opacity: 0, transform: 'translateY(-80px)', offset: 0 }),
            style({ opacity: 0.5, transform: 'translateY(-40px)', offset: 0.5 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1 })
          ])
        )
      ]),
      transition('visible => void', [
        animate('0s', style({ opacity: 0, transform: 'translateY(-80px)' }))
      ])
    ])
  ],
  host: { ngSkipHydration: 'true' },
})
export class HomeComponent {
  count!:number
  animationStateFirst = 'hidden';
  animationStateSecond = 'hidden';
  animationState2 = 'void';
  ngOnInit() {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    this.onSlideChange()
  }
  items: any[] = [
    {
      image:'assets/download-3.png',
      product:'Bags',
    },
    {
      image:'assets/shoes2.png',
      product:'Shoes',
    },
    {
      image:'assets/jacket.png',
      product:'Jackets',
    }
  ]
  btnShop(event: any) {
    event.stopPropagation();
    // Add any other logic you want to execute on click
  }
  onSlideChange(): void {
    this.animationStateFirst = 'hidden';
    this.animationStateSecond = 'hidden';
    this.animationState2 = 'void';
    setTimeout(() => {
      this.animationStateFirst = 'visible';
    }, 200); // Delay to allow Angular to detect the state change
    setTimeout(() => {
      this.animationStateSecond = 'visible';
    },500); // Delay to allow Angular to detect the state change
    setTimeout(() => {
      this.animationState2 = 'visible';
    }, 1000); // Delay to allow Angular to detect the state change
  }
}
