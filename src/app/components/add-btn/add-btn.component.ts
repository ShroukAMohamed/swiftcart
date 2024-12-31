import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-add-btn',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './add-btn.component.html',
  styleUrl: './add-btn.component.scss',
})
export class AddBtnComponent {
  count:number = 0
  isClicked!: boolean;
  quantityValue: number = 1;
  quantity:any[] = [];
  @Input() product!: any;
  constructor(private toastr: ToastrService) {}
  addToCart(index: number) {
    this.count = index;
    this.isClicked = true;
  }
  clearAddBtn(index: number, count: number, quantityValue: number) {
    this.count = 0
    this.isClicked = false;
    console.log('quantity', quantityValue);
    if (quantityValue <= count && quantityValue >= 1) {
      let localQuantity = localStorage.getItem('Cart');
      if (localQuantity != null) {
        this.quantity = JSON.parse(localQuantity!);
      }
      let temp = this.quantity?.find((item: any) => item?.item?.id == index);
      console.log(temp)
      if (temp) {
        if (temp.quantity + quantityValue <= count) {
          temp.quantity += quantityValue;
          this.toastr.success('Quantity updated successfully', '', {
            positionClass: 'toast-bottom-right',
          });
        } else {
          this.toastr.error(
            "You can't add quantity more than the available amount in stock",
            '',
            {
              positionClass: 'toast-bottom-right',
            }
          );
        }
      } else {
        this.quantity?.push({ item: this.product, quantity: quantityValue });
        console.log(this.quantity);
        console.log(this.product);
        console.log(quantityValue)
        this.toastr.success('Item added successfully', '', {
          positionClass: 'toast-bottom-right',
        });
      }
      localStorage.setItem('Cart', JSON.stringify(this.quantity));
    } else {
      this.toastr.error('quantity is invalid or not available', '', {
        positionClass: 'toast-bottom-right',
      });
    }
  }
}
