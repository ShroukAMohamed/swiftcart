import { Component, Input } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../../products/product';
import { ToastrService } from 'ngx-toastr';
import { AddBtnComponent } from "../add-btn/add-btn.component";
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [DialogModule, ButtonModule, FormsModule, CurrencyPipe, AddBtnComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent {
  @Input() productDesc!: Product;
  @Input() count!: number;
  constructor(private toastr: ToastrService) {}
}
