import { CurrencyPipe, NgClass, NgIf } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ProductsService } from '../products.service';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [TableModule, CurrencyPipe, InputTextModule, FormsModule,NgIf],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CartComponent {
  constructor(public ProductsService: ProductsService,private toastr:ToastrService) {}
  products: any[] = [];
  total: number = 0;
  discount: number = 0;
  grandTotal: number = 0;
  invalid!:boolean
  ngOnInit() {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    this.products = JSON.parse(localStorage.getItem('Cart')!) || [];
    this.calcTotal();
    console.log(this.products);
  }

  calcTotal(){
    this.total = 0
    this.discount = 0
    this.products?.map((item) => {
      this.total += item.item.price * item.quantity
      this.discount += item.quantity * 5
    })
    this.grandTotal = this.total - this.discount
    console.log(this.total);
  }

  changeQuantity(event: any, index: number, count: number) {
    let item = this.products.findIndex((item) => item.item.id == index);
    if(this.products[item].quantity >= 1) {
      if(this.products[item].quantity > count){
        event.target.value = count
        this.toastr.error('quantity is not available in stock','', {
          progressBar: true,
          positionClass: 'toast-bottom-right',
        });
      }
      this.products[item].quantity = event.target.value;
      localStorage.setItem(
        'Cart',
        JSON.stringify(this.products)
      );
      this.calcTotal();
    }else if(event.target.value == "" || event.target.value == undefined){
      console.log('still typing')
      this.calcTotal();
    }else {
      this.products.splice(item, 1);
      localStorage.setItem(
        'Cart',
        JSON.stringify(this.products)
      )
      this.calcTotal();
    }
  }

  checkQuantity(event: any,index: number) {
    let item = this.products.findIndex((item) => item.item.id == index);
    if(event.target.value == "" || event.target.value == undefined){
      this.products.splice(item, 1);
    localStorage.setItem(
      'Cart',
      JSON.stringify(this.products)
    );
    }
  }

  deleteItem(index: number) {
    let item = this.products.findIndex((item) => item.item.id == index);
    this.products.splice(item, 1);
    localStorage.setItem(
      'Cart',
      JSON.stringify(this.products)
    );
    this.calcTotal();
  }

  deleteCart(){
    localStorage.removeItem('Cart')
    this.products = []
    this.calcTotal()
  }

  increaseQuantity(index: number, count: number) {
    let item = this.products.findIndex((item) => item.item.id == index);
    this.products[item].quantity = Number(this.products[item].quantity)
    if(this.products[item].quantity < count) {
      this.products[item].quantity += 1;
      localStorage.setItem(
        'Cart',
        JSON.stringify(this.products)
      );
      this.calcTotal();
    }
  }
  decreaseQuantity(index: number) {
    let item = this.products.findIndex((item) => item.item.id == index);
    this.products[item].quantity = Number(this.products[item].quantity)
    if(this.products[item].quantity > 1) {
      this.products[item].quantity -= 1;
      localStorage.setItem(
        'Cart',
        JSON.stringify(this.products)
      );
      this.calcTotal();
    }
  }
}
