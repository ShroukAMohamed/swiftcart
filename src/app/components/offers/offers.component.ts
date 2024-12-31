import { Component,EventEmitter,Input, Output, ViewChild } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ProductsService } from '../../products.service';
import { LimitPipe } from "../../pipes/limit.pipe";
import { CurrencyPipe } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ngxLoadingAnimationTypes,NgxLoadingModule } from '@dchtools/ngx-loading-v18';
import { RouterLink } from '@angular/router';
import { AddBtnComponent } from "../add-btn/add-btn.component";
@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CarouselModule, LimitPipe, CurrencyPipe, InputTextModule, FormsModule, NgxLoadingModule, RouterLink, AddBtnComponent],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.scss'
})
export class OffersComponent {
  constructor(private ProductsService:ProductsService,private toastr:ToastrService){}
  responsiveOptions: any[] | undefined;
  limitedProducts:any[] = []
  ngOnInit(){
    this.limitProducts()
    this.responsiveOptions = [
      {
        breakpoint: '1279px',
        numVisible: 3,
        numScroll: 1
      },
      {
          breakpoint: '1023px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '650px',
          numVisible: 1.5,
          numScroll: 1
      },
      {
        breakpoint: '500px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }
  limitProducts(){
    this.ProductsService.getLimitProducts(8).subscribe({
      next: (response) => {
        this.limitedProducts = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
