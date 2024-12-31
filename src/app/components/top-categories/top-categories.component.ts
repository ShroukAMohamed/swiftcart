import { CurrencyPipe, NgFor } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ProductsService } from '../../products.service';
import { BehaviorSubject } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  ngxLoadingAnimationTypes,
  NgxLoadingModule,
} from '@dchtools/ngx-loading-v18';
import { AddBtnComponent } from '../add-btn/add-btn.component';

@Component({
  selector: 'app-top-categories',
  standalone: true,
  imports: [
    MatTabsModule,
    NgFor,
    CurrencyPipe,
    InputTextModule,
    FormsModule,
    NgxLoadingModule,
    AddBtnComponent,
  ],
  templateUrl: './top-categories.component.html',
  styleUrl: './top-categories.component.scss',
})
export class TopCategoriesComponent {
  constructor(
    private ProductsService: ProductsService,
    private toastr: ToastrService
  ) {}
  categoriesName: any;
  productsByCategory: any;
  productLabel: BehaviorSubject<any> = new BehaviorSubject('electronics');
  // quantity: any = [];
  public loading = false;
  public config = {
    animationType: ngxLoadingAnimationTypes.circleSwish, // Animation type
    backdropBackgroundColour: 'rgba(0, 0, 0, 0.6)', // Backdrop color
    primaryColour: '#fff', // Primary spinner color
    secondaryColour: '#ccc', // Secondary spinner color
    tertiaryColour: '#f5f5f5', // Tertiary spinner color
    fullScreenBackdrop: true,
  };
  ngOnInit() {
    this.getCategories();
    this.getProductsByCategories();
  }
  getCategories() {
    this.ProductsService.getCategories().subscribe({
      next: (response) => {
        this.categoriesName = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  getProductsByCategories() {
    this.productLabel.subscribe(() => {
      this.loading = true;
      this.ProductsService.getProductsByCategory(
        this.productLabel.getValue()
      ).subscribe({
        next: (response) => {
          this.loading = false;
          this.productsByCategory = response;
        },
        error: (error) => {
          this.loading = false;
          console.log(error);
        },
      });
    });
  }
}
