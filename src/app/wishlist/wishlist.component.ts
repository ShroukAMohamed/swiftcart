import { CurrencyPipe, DOCUMENT, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { Product } from '../products/product';
import { ProductDetailsComponent } from '../components/product-details/product-details.component';
import { AddBtnComponent } from "../components/add-btn/add-btn.component";

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CurrencyPipe, FormsModule, NgFor, NgIf, DialogModule, ButtonModule, ProductDetailsComponent, AddBtnComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {
wishList:any[]=[]
visible: boolean = false;
productDesc:Product = {
  id: 0,
  title: '',
  description: '',
  price: 0,
  category: '',
  image: '',
  rating: {
    rate: 0,
    count: 0
  }
};

constructor(private toastr:ToastrService){}
ngOnInit(){
  if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  let list = localStorage.getItem('Wishlist')
  if(list != null) {
    this.wishList = JSON.parse(list!)
  }
}

showDialog(index: number) {
  this.visible = true;
  let product = this.wishList?.find((item:any) => item.item.id == index)
  this.productDesc = product.item
  console.log(this.productDesc)
}

removeFromWishlist(index: number) {
  let list = localStorage.getItem('Wishlist')
  if(list != null) {
    this.wishList = JSON.parse(list!)
  }
  this.wishList.splice(this.wishList.indexOf(this.wishList.find((item:any) => item.item.id == index)),1)
  localStorage.setItem('Wishlist',JSON.stringify(this.wishList))
}
}
